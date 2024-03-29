package cn.edu.tute.server.handler;

import cn.edu.tute.game.GamePlayerInfo;
import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.service.MsgHandService;
import cn.edu.tute.server.service.impl.MsgHandServiceImpl;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.*;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.handler.codec.http.websocketx.*;
import io.netty.util.CharsetUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;


@Component
@ChannelHandler.Sharable
public class WebSocketServerHandler extends SimpleChannelInboundHandler<Object> {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketServerHandler.class);

    private WebSocketServerHandshaker handshaker;

    @Autowired
    StringRedisTemplate redisTemplate;

    @Autowired
    ConnectManager connectManager;

    @Autowired
    private MsgHandService msgHandService;

    @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
        logger.info("有新连接："+ctx.channel().id().toString());
    }

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
        System.out.println("收到信息:" + request);
        JSONObject jsonMsg = null;
        try {
            jsonMsg = JSONObject.parseObject(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (jsonMsg == null) {
            return;
        }
        String msgType = (String) jsonMsg.get("type");
        if (msgType.equals("token") && msgType != null) {
            String flag = (String) jsonMsg.get("flag");
            if (flag.equals("1")) {
                msgHandService.handToken1(jsonMsg, ctx);
            }
            if (flag.equals("2")) {
                msgHandService.handToken2(jsonMsg, ctx);
            }

        } else if (msgType.equals("private") && msgType != null) {
            msgHandService.handPrivate(jsonMsg, ctx);
        } else if (msgType.equals("world") && msgType != null) {
            msgHandService.handWorld(jsonMsg, ctx);
        } else if (msgType.equals("ready") && msgType != null) {
            msgHandService.handReady(jsonMsg, ctx);
        } else if (msgType.equals("round") && msgType != null) {
            msgHandService.handRound(jsonMsg, ctx);
        } else if (msgType.equals("play") && msgType != null) {
            msgHandService.handGet(jsonMsg, ctx);
        } else if (msgType.equals("end") && msgType != null) {
            msgHandService.handEnd(jsonMsg, ctx);
        } else if (msgType.equals("over") && msgType != null) {
            msgHandService.handOver(jsonMsg, ctx);
        } else if (msgType.equals("result") && msgType != null) {
//            msgHandService.handResult(jsonMsg, ctx);
        } else if (msgType.equals("createRoom") && msgType != null) {
            msgHandService.handCreateRoom(jsonMsg, ctx);
        } else if (msgType.equals("joinRoom") && msgType != null) {
            msgHandService.handJoinRoom(jsonMsg, ctx);
        } else if (msgType.equals("match") && msgType != null) {
            msgHandService.handMatch(jsonMsg, ctx);
        } else if (msgType.equals("getRoom") && msgType != null) {
            msgHandService.handGetRoom(jsonMsg, ctx);
        } else if (msgType.equals("round1") && msgType != null){
            msgHandService.handRound1(jsonMsg,ctx);
        } else if (msgType.equals("get") && msgType!=null){
            msgHandService.handGet(jsonMsg,ctx);
        }

    }

    @Override
    public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
//        ConcurrentHashMap connections=connectManager.getConnections();
//        String userToken=redisTemplate.opsForValue().get(ctx.channel().id().toString());
//        String gamePlayerInfoStr=redisTemplate.opsForValue().get(userToken);
//        GamePlayerInfo gamePlayerInfo=JSON.parseObject(gamePlayerInfoStr, GamePlayerInfo.class);
//        redisTemplate.delete("roomId:"+gamePlayerInfo.getRoomId());
//        redisTemplate.delete(userToken);
//        redisTemplate.delete(ctx.channel().id().toString());
//        connections.remove(userToken);
    }

    private static boolean isKeepAlive(FullHttpRequest request) {
        return false;
    }
}
