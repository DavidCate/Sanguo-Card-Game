package cn.edu.tute.server.service.impl;

import cn.edu.tute.netty.jsonMsgPoJo.WorldMsg;
import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.GameLogicService;
import cn.edu.tute.server.service.MsgHandService;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.Enumeration;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class MsgHandServiceImpl implements MsgHandService {
    public MsgHandServiceImpl() {

    }

    @Autowired
    ConnectManager connectManager;

    @Autowired
    RedisService redisService;

    @Autowired
    GameLogicService gameLogicService;

    public void handPrivate(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        String toUserToken = (String) jsonMsg.get("token");
        if (connections.containsKey(toUserToken)) {
            ChannelHandlerContext toUserChannel = connections.get(toUserToken);
            toUserChannel.channel().write(new TextWebSocketFrame((String) jsonMsg.get("msg")));
        } else {
            ctx.channel().write(new TextWebSocketFrame("用户不存在或不在线。"));
        }
    }

    public void handWorld(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        WorldMsg worldMsg = JSONObject.parseObject(jsonMsg.toJSONString(), WorldMsg.class);
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        Enumeration<ChannelHandlerContext> enumeration = connections.elements();
        while (enumeration.hasMoreElements()) {
            ChannelHandlerContext channelHandlerContext = enumeration.nextElement();


            channelHandlerContext.channel().write(new TextWebSocketFrame());
        }
    }

    public void handReady(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String value = (String) jsonMsg.get("value");
        if (value.equals("true")) {

        }
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
        String token = (String) jsonMsg.get("token");
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        //通过已经登录得到的token绑定相应的channel
        if (connections.containsKey(token)) {
            //连接管理中已经有token了  说明断线重连
        } else {
            //登录后绑定连接
            connections.put(token, ctx);
            connectManager.setConnections(connections);

        }
//        connections.put((String) jsonMsg.get("token"),ctx);
    }

    public void handCreateRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        gameLogicService.createRoom(jsonMsg, ctx);
    }

    public void handJoinRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        gameLogicService.joinRoom(jsonMsg, ctx);
    }

    public void handMatch(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        gameLogicService.match(jsonMsg, ctx);
    }
}
