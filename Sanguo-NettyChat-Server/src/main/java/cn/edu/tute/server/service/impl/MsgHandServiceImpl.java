package cn.edu.tute.server.service.impl;

import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.MsgHandService;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;


public class MsgHandServiceImpl implements MsgHandService {
    @Autowired
    ConnectManager connectManager;

    @Autowired
    RedisService redisService;

    Map<String,ChannelHandlerContext> connections=connectManager.getConnections();

    public void handPrivate(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String toUserToken=(String) jsonMsg.get("token");
        if (connections.containsKey(toUserToken)){
            ChannelHandlerContext toUserChannel=connections.get(toUserToken);
            toUserChannel.channel().write(new TextWebSocketFrame((String)jsonMsg.get("msg")));
        }else {
            ctx.channel().write(new TextWebSocketFrame("用户不存在或不在线。"));
        }
    }

    public void handWorld(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handReady(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handRound(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handPlay(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handEnd(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handOver(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handResult(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handToken(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        connections.put((String) jsonMsg.get("token"),ctx);
    }
}
