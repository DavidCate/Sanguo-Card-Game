package cn.edu.tute.server.handler;

import com.alibaba.fastjson.JSONObject;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.handler.codec.http.websocketx.*;
import io.netty.util.CharsetUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebSocketServerHandler extends SimpleChannelInboundHandler<Object> {
    private static final Logger logger= LoggerFactory.getLogger(WebSocketServerHandler.class);

    private WebSocketServerHandshaker handshaker;

    protected void channelRead0(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof FullHttpRequest) {
            handleHttpRequest(ctx, (FullHttpRequest) msg);
        } else if (msg instanceof WebSocketFrame) {
            handlerWebSocketFrame(ctx, (WebSocketFrame) msg);
        }
    }

    private void handleHttpRequest(ChannelHandlerContext ctx, FullHttpRequest request) {
        if (!request.decoderResult().isSuccess()) {
            sendHttpResponse(ctx, request, new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.BAD_REQUEST));
        }
        WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory("ws:/" + ctx.channel() + "/websocket", null, false);
        handshaker = wsFactory.newHandshaker(request);
        if (handshaker == null) {
            WebSocketServerHandshakerFactory.sendUnsupportedVersionResponse(ctx.channel());
        } else {
            handshaker.handshake(ctx.channel(), request);
        }
    }

    private void sendHttpResponse(ChannelHandlerContext ctx, FullHttpRequest request, DefaultFullHttpResponse response) {
        if (response.status().code() != 200) {
            ByteBuf buf = Unpooled.copiedBuffer(response.status().toString(), CharsetUtil.UTF_8);
            response.content().writeBytes(buf);
            buf.release();
        }
        ChannelFuture future = ctx.channel().writeAndFlush(response);
        if (!isKeepAlive(request) || response.status().code() != 200) {
            future.addListener(ChannelFutureListener.CLOSE);
        }
    }

    private void handlerWebSocketFrame(ChannelHandlerContext ctx, WebSocketFrame msg) {
        if (msg instanceof CloseWebSocketFrame) {
            CloseWebSocketFrame frame = (CloseWebSocketFrame) msg.retain();
//            ReferenceCountUtil.retain(frame);
            handshaker.close(ctx.channel(), frame);
            return;
        }
        if (msg instanceof PingWebSocketFrame) {
            ctx.channel().write(new PongWebSocketFrame(msg.content().retain()));
        }
        if (!(msg instanceof TextWebSocketFrame)) {
            System.out.println("只支持文本格式");
            ctx.close();
        }
        System.out.println(ctx.channel().id().asLongText());
        String request = ((TextWebSocketFrame) msg).text();
        System.out.println("收到注册信息:" + request);
        JSONObject jsonObject = null;
        try {
            jsonObject = JSONObject.parseObject(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (jsonObject == null) {
            return;
        }
        String from = (String) jsonObject.get("from");
        String msgType = (String) jsonObject.get("msgType");
//        String msg1 = "{\"user\":" + "\"" + from + "\"" + "," + "\"netty\":" + "\"" + ctx.channel().localAddress().toString() + "\""+","+"\"http\":"+"\""+NettyServerConfig.getResourceString("httpserver.host")+":"+NettyServerConfig.getResourceString("httpserver.port")+"\""+"}";
        if (msgType.equals("regist")) {
//            JedisUtil jedisUtil= JedisUtil.getInstance();
//
//            System.out.println("存到redis:" + jedisUtil.set(from, msg1));
////            JedisUtil jedisUtil=JedisUtil.getInstance();
////            System.out.println("存到redis："+jedisUtil.set(from,msg1));
//            Constant.localConnectMap.put(from, ctx);
        }
    }



    private static boolean isKeepAlive(FullHttpRequest request) {
        return false;
    }
}
