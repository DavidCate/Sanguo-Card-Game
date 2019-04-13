package cn.edu.tute.server.service.impl;

import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.MsgHandService;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



import java.util.concurrent.ConcurrentHashMap;

@Component
public class MsgHandServiceImpl implements MsgHandService {
    public MsgHandServiceImpl(){

    }
    @Autowired
    ConnectManager connectManager;

    @Autowired
    RedisService redisService;

    public void handPrivate(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        ConcurrentHashMap<String,ChannelHandlerContext> connections=connectManager.getConnections();
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

//        connections.put((String) jsonMsg.get("token"),ctx);
    }
}
