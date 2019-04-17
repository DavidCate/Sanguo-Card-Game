package cn.edu.tute.server.service.impl;

import cn.edu.tute.entities.response.SuccessResponse;
import cn.edu.tute.game.Room;
import cn.edu.tute.netty.jsonMsgPoJo.ReadyMsg;
import cn.edu.tute.netty.jsonMsgPoJo.ResultMsg;
import cn.edu.tute.netty.jsonMsgPoJo.RoundMsg;
import cn.edu.tute.netty.jsonMsgPoJo.WorldMsg;
import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.GameLogicService;
import cn.edu.tute.server.service.MsgHandService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.Enumeration;
import java.util.Random;
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
//        ctx.writeAndFlush(new TextWebSocketFrame(jsonMsg.toJSONString()));
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        String toUserToken = (String) jsonMsg.get("token");
        if (connections.containsKey(toUserToken)) {
            ChannelHandlerContext toUserChannel = connections.get(toUserToken);
            toUserChannel.channel().write(new TextWebSocketFrame((String) jsonMsg.get("msg")));
        } else {
            ctx.channel().writeAndFlush(new TextWebSocketFrame("用户不存在或不在线。"));
        }
    }

    public void handWorld(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        Enumeration<ChannelHandlerContext> enumeration = connections.elements();
        while (enumeration.hasMoreElements()) {
            ChannelHandlerContext channelHandlerContext = enumeration.nextElement();
            if (ctx!=channelHandlerContext){
                channelHandlerContext.channel().writeAndFlush(new TextWebSocketFrame(jsonMsg.toJSONString()));
            }
        }
    }

    public void handReady(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String value = (String) jsonMsg.get("value");
        if (value.equals("true")) {
            String userToken = redisService.get(ctx.channel().id().toString());
            String roomId = redisService.get("roomIdForToken:" + userToken);
            Room room = redisService.get(roomId, Room.class);
            String readyStatus = room.getReadyStatus();
            if (readyStatus.equals("0")) {
                room.setReadyStatus("1");
                redisService.set(roomId, room);
                ReadyMsg readyMsg = new ReadyMsg();
                readyMsg.setIsSuccess("true");
                ctx.channel().write(new TextWebSocketFrame(JSONObject.toJSONString(readyMsg)));
            }
            if (readyStatus.equals("1")) {
                room.setReadyStatus("2");
                redisService.set(roomId, room);
                ConcurrentHashMap<String, ChannelHandlerContext> connect = connectManager.getConnections();
                ChannelHandlerContext player1 = connect.get(room.getPlayer1());
                ChannelHandlerContext player2 = connect.get(room.getPlayer2());
                RoundMsg roundMsg = new RoundMsg();
                Random random = new Random();
                int lukey = random.nextInt(1);
                if (lukey == 0) {
                    roundMsg.setValue("true");
                    player1.channel().write(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
                    roundMsg.setValue("false");
                    player2.channel().write(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
                } else {
                    roundMsg.setValue("false");
                    player1.channel().write(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
                    roundMsg.setValue("true");
                    player2.channel().write(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
                }
            }
        }
    }

//    public void handRound(JSONObject jsonMsg, ChannelHandlerContext ctx) {
//
//    }

    public void handPlay(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String userToken = redisService.get(ctx.channel().id().toString());
        String roomId = redisService.get("roomIdForToken:" + userToken);
        Room room = redisService.get(roomId, Room.class);
        ConcurrentHashMap<String, ChannelHandlerContext> connect = connectManager.getConnections();
        ChannelHandlerContext player1 = connect.get(room.getPlayer1());
        ChannelHandlerContext player2 = connect.get(room.getPlayer2());

//        String currentUserToken=redisService.get(ctx.channel().id().toString());
    }

    public void handEnd(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String userToken = redisService.get(ctx.channel().id().toString());
        String roomId = redisService.get("roomIdForToken:" + userToken);
        Room room = redisService.get(roomId, Room.class);
        String oneToken=redisService.get(ctx.channel().id().toString());
        ConcurrentHashMap<String,ChannelHandlerContext> connect=connectManager.getConnections();
        if (room.getPlayer1().equals(oneToken)){
            //说明ctx是player1
            ChannelHandlerContext sendChannel=connect.get(room.getPlayer2());
            RoundMsg roundMsg=new RoundMsg();
            roundMsg.setValue("true");
            sendChannel.channel().write(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
        }else {
            //说明ctx是player2
            ChannelHandlerContext sendChannel=connect.get(room.getPlayer1());
            RoundMsg roundMsg=new RoundMsg();
            roundMsg.setValue("true");
            sendChannel.channel().write(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
        }
        SuccessResponse successResponse=new SuccessResponse();
        successResponse.setErrorMsg("消息发送成功");
        ctx.channel().write(new TextWebSocketFrame(successResponse.send()));
    }

    public void handOver(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String userToken = redisService.get(ctx.channel().id().toString());
        String roomId = redisService.get("roomIdForToken:" + userToken);
        Room room = redisService.get(roomId, Room.class);
        ConcurrentHashMap<String, ChannelHandlerContext> connect = connectManager.getConnections();
        ChannelHandlerContext player1 = connect.get(room.getPlayer1());
        ChannelHandlerContext player2 = connect.get(room.getPlayer2());
        ResultMsg resultMsg=new ResultMsg();
        //需要游戏内容逻辑
        player1.channel().write(new TextWebSocketFrame(JSON.toJSONString(resultMsg)));
        player2.channel().write(new TextWebSocketFrame(JSON.toJSONString(resultMsg)));
    }

//    public void handResult(JSONObject jsonMsg, ChannelHandlerContext ctx) {
//
//    }

    public void handToken(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String token = (String) jsonMsg.get("value");
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        //通过已经登录得到的token绑定相应的channel
        if (connections.containsKey(token)) {
            //连接管理中已经有token了  说明断线重连
        } else {
            //登录后绑定连接
            connections.put(token, ctx);
            connectManager.setConnections(connections);
            redisService.set(ctx.channel().id().toString(), token);
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
