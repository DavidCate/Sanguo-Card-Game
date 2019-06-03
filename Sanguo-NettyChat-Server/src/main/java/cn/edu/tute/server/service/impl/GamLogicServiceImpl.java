package cn.edu.tute.server.service.impl;

import cn.edu.tute.game.*;
import cn.edu.tute.netty.jsonMsgPoJo.CreateRoomMsg;
import cn.edu.tute.netty.jsonMsgPoJo.JoinMsg;
import cn.edu.tute.netty.jsonMsgPoJo.MatchMsg;
import cn.edu.tute.netty.jsonMsgPoJo.NoticeMsg;
import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.GameLogicService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * roomId:token
 *
 */

@Component
public class GamLogicServiceImpl implements GameLogicService {
    @Autowired
    RedisService redisService;

    @Autowired
    StringRedisTemplate redisTemplate;

    @Autowired
    ConnectManager connectManager;

    public void createRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        Room room = null;
        //通过ctx 获取token
        String roomMaster = redisTemplate.opsForValue().get(ctx.channel().id().toString());
        String gameplayerInfoStr=redisTemplate.opsForValue().get(roomMaster);
        GamePlayerInfo gamePlayerInfo=null;
        if (gameplayerInfoStr!=null&&gameplayerInfoStr.equals("")) {
            gamePlayerInfo=JSON.parseObject(gameplayerInfoStr, GamePlayerInfo.class);
        }
        UUID roomId=UUID.randomUUID();
        //通过token获取用户游戏进程中的信息
        String firstRoomInfo =null;
        if (gamePlayerInfo!=null){
            firstRoomInfo = redisService.get("roomId:" + gamePlayerInfo.getRoomId());
        }
        //判断用户是否存在
        if (roomMaster != null) {
            if (firstRoomInfo == null) {
                //创建房间
                room = new Room();
                room.setPlayer1(roomMaster);
                room.setName(roomMaster);
                room.setReadyStatus("0");
                room.setRound("0");
            }
        }
        if (room != null) {
            gamePlayerInfo=new GamePlayerInfo();
            gamePlayerInfo.setRoomId(roomId.toString());
            redisService.set("roomId:" + roomId, room);
            redisTemplate.opsForValue().set(roomMaster,JSONObject.toJSONString(gamePlayerInfo));
            String idleRoomsStr=redisTemplate.opsForValue().get("idleRooms");
            IdleRoom idleRoom = JSON.parseObject(idleRoomsStr,IdleRoom.class);
            //idleRoom 不为空说明有待加入的房间，需要先判断要新创建的房间是否 已经存在于idle列表
            if (idleRoom != null) {
                List<String> idleRooms = idleRoom.getIdleRooms();
                if (!idleRooms.contains("roomId:" + roomId)) {
                    //空闲列表没有这个房间id 就把这个房间id 加入空闲列表
                    idleRoom.getIdleRooms().add("roomId:" + roomId);
                    redisService.set("idleRooms", idleRoom);
                }
            } else {
                //把新创建的房间放进idleRooms
                IdleRoom idleRoom1 = new IdleRoom();
                List<String> idleRoomList = new LinkedList<String>();
                idleRoomList.add("roomId:" + roomId);
                idleRoom1.setIdleRooms(idleRoomList);
                redisService.set("idleRooms", idleRoom1);
            }
            CreateRoomResponse createRoomResponse=new CreateRoomResponse();
            createRoomResponse.setErrMsg("true");
            ctx.channel().writeAndFlush(new TextWebSocketFrame(JSONObject.toJSONString(createRoomResponse)));
        } else {
            //该用户已经存在一个房间
            CreateRoomMsg msg = new CreateRoomMsg();
            msg.setIsSuccess("false");
            msg.setErrMsg("该用户已经创建了房间");
            msg.setRoomInfo(firstRoomInfo);
            ctx.channel().write(new TextWebSocketFrame(JSONObject.toJSONString(msg)));
        }
    }



    public void joinRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        String joinRoomId = (String) jsonMsg.get("roomId");
        String idleRoomsStr=redisTemplate.opsForValue().get("idleRooms");
        IdleRoom idleRoom=JSON.parseObject(idleRoomsStr,IdleRoom.class);
        List<String> idleRooms = idleRoom.getIdleRooms();

//        GamePlayerInfo gamePlayerInfo=JSON.parseObject(gamePlayerInfoStr,GamePlayerInfo.class);
        System.out.println("测试-------------------->"+"roomId:"+joinRoomId);
        if (idleRooms.contains("roomId:"+joinRoomId)) {
            String roomInfo = redisTemplate.opsForValue().get("roomId:"+joinRoomId);
            Room room = JSON.parseObject(roomInfo, Room.class);
            String userToken=redisService.get(ctx.channel().id().toString());
            room.setPlayer2(userToken);
            //玩家2加入房间
            redisService.set("roomId:"+joinRoomId,room);
            GamePlayerInfo gamePlayerInfo=new GamePlayerInfo();
            gamePlayerInfo.setRoomId(joinRoomId);
            redisTemplate.opsForValue().set(userToken,JSONObject.toJSONString(gamePlayerInfo));

            idleRooms.remove("roomId:"+joinRoomId);
            idleRoom.setIdleRooms(idleRooms);
            redisTemplate.opsForValue().set("idleRooms",JSON.toJSONString(idleRoom));
            JoinMsg joinMsg=new JoinMsg();
            joinMsg.setIsSuccess("true");
            ctx.channel().writeAndFlush(new TextWebSocketFrame(JSONObject.toJSONString(joinMsg)));
        } else {
            JoinMsg joinMsg=new JoinMsg();
            joinMsg.setIsSuccess("false");
            joinMsg.setErrMsg("房间已满");
            ctx.channel().write(new TextWebSocketFrame(JSONObject.toJSONString(joinMsg)));
        }
    }

    public void match(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        IdleRoom idleRoom=redisService.get("idleRooms",IdleRoom.class);
        List<String> idleRooms=idleRoom.getIdleRooms();
        Random random=new Random();
        int index=random.nextInt(idleRooms.size());
        String roomId=idleRooms.get(index);
        //清除空闲列表中的选中的房间号
        idleRooms.remove(index);
        redisService.set("idleRooms",idleRoom);
        //修改房间信息
        Room room=redisService.get(roomId,Room.class);
        String userToken=redisService.get(ctx.channel().id().toString());
        room.setPlayer2(userToken);
        redisService.set("roomId:"+room.getPlayer1(),room);
        //通知被选中的房间里的玩家
        ConcurrentHashMap<String, ChannelHandlerContext> connections=connectManager.getConnections();
        ChannelHandlerContext toUserConnect=connections.get(room.getPlayer1());
        NoticeMsg msg=new NoticeMsg();
        msg.setUserName(room.getPlayer2());
        toUserConnect.channel().write(new TextWebSocketFrame(JSONObject.toJSONString(msg)));
        //回馈给匹配的人房间信息
        MatchMsg matchMsg=new MatchMsg();
        matchMsg.setIsSuccess("true");
        matchMsg.setErrMsg(JSONObject.toJSONString(room));
        ctx.channel().write(new TextWebSocketFrame(JSONObject.toJSONString(matchMsg)));
    }

    public void getRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        Set<String> rooms=redisTemplate.keys("roomId*");
        RoomList roomList=new RoomList();
        roomList.setRoomlist(rooms);
        ctx.channel().writeAndFlush(new TextWebSocketFrame( JSONObject.toJSONString(roomList)));
    }
}
