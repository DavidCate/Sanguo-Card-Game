package cn.edu.tute.server.service.impl;

import cn.edu.tute.entities.CardsInfo;
import cn.edu.tute.entities.GameUserInfo;
import cn.edu.tute.entities.UserInfo;
import cn.edu.tute.entities.response.SuccessResponse;
import cn.edu.tute.game.GamePlayerInfo;
import cn.edu.tute.game.IdleRoom;
import cn.edu.tute.game.Room;
import cn.edu.tute.netty.jsonMsgPoJo.*;
import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.mapper.GameMapper;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.GameLogicService;
import cn.edu.tute.server.service.MsgHandService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class MsgHandServiceImpl implements MsgHandService {
    public MsgHandServiceImpl() {

    }

    @Autowired
    GameMapper gameMapper;

    @Autowired
    ConnectManager connectManager;

    @Autowired
    RedisService redisService;

    @Autowired
    StringRedisTemplate redisTemplate;

    @Autowired
    GameLogicService gameLogicService;



    public void handPrivate(JSONObject jsonMsg, ChannelHandlerContext ctx) {
//        ctx.writeAndFlush(new TextWebSocketFrame(jsonMsg.toJSONString()));
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        String fromUserCtxId = ctx.channel().id().toString();
        String fromUserToken=redisTemplate.opsForValue().get(fromUserCtxId);
        String gamePlayerInfoStr=redisTemplate.opsForValue().get(fromUserToken);
        GamePlayerInfo gamePlayerInfo=JSON.parseObject(gamePlayerInfoStr,GamePlayerInfo.class);
        String roomInfo=redisTemplate.opsForValue().get("roomId:"+gamePlayerInfo.getRoomId());
        Room room=JSON.parseObject(roomInfo,Room.class);
        String player1Token=room.getPlayer1();
        if (!player1Token.equals(fromUserToken)){
            if (connections.containsKey(player1Token)){
                ChannelHandlerContext toUserChannel = connections.get(player1Token);
                toUserChannel.channel().writeAndFlush(new TextWebSocketFrame(jsonMsg.toJSONString()));
            }else {
                ctx.channel().writeAndFlush(new TextWebSocketFrame("用户不存在或不在线。"));
            }
        }else {
            String player2Token=room.getPlayer2();
            if (connections.containsKey(player2Token)){
                ChannelHandlerContext toUserChannel = connections.get(player2Token);
                toUserChannel.channel().writeAndFlush(new TextWebSocketFrame(jsonMsg.toJSONString()));
            }else {
                ctx.channel().writeAndFlush(new TextWebSocketFrame("用户不存在或不在线。"));
            }
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
            String userToken = redisTemplate.opsForValue().get(ctx.channel().id().toString());
            String gamePlayerInfoStr = redisService.get(userToken);
            GamePlayerInfo gamePlayerInfo=JSON.parseObject(gamePlayerInfoStr,GamePlayerInfo.class);
            String roomId=gamePlayerInfo.getRoomId();
            String roomInfoStr=redisTemplate.opsForValue().get("roomId:"+roomId);
            Room room = JSON.parseObject(roomInfoStr,Room.class);
            String readyStatus = room.getReadyStatus();
            if (readyStatus.equals("0")) {
                room.setReadyStatus("1");
                redisTemplate.opsForValue().set("roomId:"+roomId, JSON.toJSONString(room));
//                ReadyMsg readyMsg = new ReadyMsg();
//                readyMsg.setIsSuccess("true");
//                ctx.channel().write(new TextWebSocketFrame(JSONObject.toJSONString(readyMsg)));
            }
            if (readyStatus.equals("1")) {
                room.setReadyStatus("2");
                redisTemplate.opsForValue().set("roomId:"+roomId, JSON.toJSONString(room));
                ConcurrentHashMap<String, ChannelHandlerContext> connect = connectManager.getConnections();
                ChannelHandlerContext player1 = connect.get(room.getPlayer1());
                ChannelHandlerContext player2 = connect.get(room.getPlayer2());
                RoundMsg roundMsg = new RoundMsg();
                Random random = new Random();
                int lukey = random.nextInt(1);
                if (lukey == 0) {
                    roundMsg.setValue("true");
                    player1.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
                    roundMsg.setValue("false");
                    player2.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
                } else {
                    roundMsg.setValue("false");
                    player1.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
                    roundMsg.setValue("true");
                    player2.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
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
        String userToken = redisTemplate.opsForValue().get(ctx.channel().id().toString());
        String gamePlayerInfoStr = redisTemplate.opsForValue().get(userToken);
        GamePlayerInfo gamePlayerInfo=JSON.parseObject(gamePlayerInfoStr,GamePlayerInfo.class);
        String roomStr=redisTemplate.opsForValue().get("roomId:"+gamePlayerInfo.getRoomId());
        Room room =JSON.parseObject(roomStr,Room.class);
        ConcurrentHashMap<String,ChannelHandlerContext> connect=connectManager.getConnections();
        if (room.getPlayer1().equals(userToken)){
            //说明ctx是player1
            ChannelHandlerContext sendChannel=connect.get(room.getPlayer2());
            RoundMsg roundMsg=new RoundMsg();
            roundMsg.setType("round1");
            roundMsg.setValue("true");
            sendChannel.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
        }else {
            //说明ctx是player2
            ChannelHandlerContext sendChannel=connect.get(room.getPlayer1());
            RoundMsg roundMsg=new RoundMsg();
            roundMsg.setType("round1");
            roundMsg.setValue("true");
            sendChannel.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(roundMsg)));
        }
    }


    /**
     * 缺少录入游戏结果到数据库
     * @param jsonMsg
     * @param ctx
     */
    public void handOver(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        ConcurrentHashMap<String, ChannelHandlerContext> connect = connectManager.getConnections();
        String fromUserToken=redisTemplate.opsForValue().get(ctx.channel().id().toString());
        String gamePlayerInfoStr=redisTemplate.opsForValue().get(fromUserToken);
        GamePlayerInfo gamePlayerInfo=JSON.parseObject(gamePlayerInfoStr,GamePlayerInfo.class);
        String roomStr=redisTemplate.opsForValue().get("roomId:"+gamePlayerInfo.getRoomId());
        Room room=JSON.parseObject(roomStr,Room.class);
        ChannelHandlerContext player1 = connect.get(room.getPlayer1());
        ChannelHandlerContext player2 = connect.get(room.getPlayer2());
        ResultMsg resultMsg=new ResultMsg();
//插入游戏记录
        String user1name=redisTemplate.opsForValue().get("tokenId:"+room.getPlayer1());
        String user2name=redisTemplate.opsForValue().get("tokenId:"+room.getPlayer2());
        GameUserInfo gameUser1Info=gameMapper.selectUserInfo(user1name);
        GameUserInfo gameUser2Info=gameMapper.selectUserInfo(user2name);
        Date date=new Date();
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time=simpleDateFormat.format(date);
        if (room.getPlayer1().equals(fromUserToken)){
            //输了
            resultMsg.setValue("true");
            int in1=gameMapper.insertRecord(time,gameUser2Info.getName(),resultMsg.getValue(),gameUser1Info.getId());
            if (in1!=0){
                resultMsg.setInsert("true");
            }
            player1.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(resultMsg)));
            resultMsg.setValue("false");
            int in2=gameMapper.insertRecord(time,gameUser1Info.getName(),resultMsg.getValue(),gameUser2Info.getId());
            if (in2!=0){
                resultMsg.setInsert("true");
            }
            player2.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(resultMsg)));
        }else {
            resultMsg.setValue("false");
            player1.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(resultMsg)));
            resultMsg.setValue("true");
            player2.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(resultMsg)));
        }

//        清除redis中的房间数据
//        redisTemplate.delete("roomId:"+gamePlayerInfo.getRoomId());

    }

//    public void handResult(JSONObject jsonMsg, ChannelHandlerContext ctx) {
//
//    }

    public void handToken1(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String token = (String) jsonMsg.get("value");
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        //通过已经登录得到的token绑定相应的channel
            //登录后绑定连接
            connections.put(token, ctx);
            connectManager.setConnections(connections);
            redisTemplate.opsForValue().set(ctx.channel().id().toString(), token);
//            redisService.set();
//        connections.put((String) jsonMsg.get("token"),ctx);
    }

    public void handToken2(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String token = (String) jsonMsg.get("value");
        ConcurrentHashMap<String, ChannelHandlerContext> connections = connectManager.getConnections();
        ChannelHandlerContext channelHandlerContext=connections.get(token);
        String originalCtx=channelHandlerContext.channel().id().toString();
        redisTemplate.delete(originalCtx);
        connections.put(token, ctx);
        connectManager.setConnections(connections);
        redisTemplate.opsForValue().set(ctx.channel().id().toString(), token);
//            redisService.set();
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

    public void handGetRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        gameLogicService.getRoom(jsonMsg,ctx);
    }

    public void handRound1(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handRound(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void handGet(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        ConcurrentHashMap<String,ChannelHandlerContext> connections=connectManager.getConnections();
        String fromUserToken=redisTemplate.opsForValue().get(ctx.channel().id().toString());
        String gamePlayerInfoStr=redisTemplate.opsForValue().get(fromUserToken);
        GamePlayerInfo gamePlayerInfo=JSON.parseObject(gamePlayerInfoStr,GamePlayerInfo.class);
        String roomStr=redisTemplate.opsForValue().get("roomId:"+gamePlayerInfo.getRoomId());
        Room room=JSON.parseObject(roomStr,Room.class);
        if (!fromUserToken.equals(room.getPlayer1())){
            ChannelHandlerContext toUserChannel=connections.get(room.getPlayer1());
            toUserChannel.writeAndFlush(new TextWebSocketFrame(jsonMsg.toJSONString()));
        }else {
            ChannelHandlerContext toUserChannel=connections.get(room.getPlayer2());
            toUserChannel.writeAndFlush(new TextWebSocketFrame(jsonMsg.toJSONString()));
        }
    }

    public void handCards(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String cardsInfo=redisTemplate.opsForValue().get("cards");
        CardsInfo cardsInfo1=JSON.parseObject(cardsInfo,CardsInfo.class);
        ctx.channel().writeAndFlush(new TextWebSocketFrame( JSON.toJSONString(cardsInfo1)));
    }
}
