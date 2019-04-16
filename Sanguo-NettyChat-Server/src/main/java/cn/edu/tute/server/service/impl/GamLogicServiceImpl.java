package cn.edu.tute.server.service.impl;

import cn.edu.tute.game.IdleRoom;
import cn.edu.tute.game.Room;
import cn.edu.tute.netty.jsonMsgPoJo.CreateRoomMsg;
import cn.edu.tute.netty.jsonMsgPoJo.JoinMsg;
import cn.edu.tute.netty.jsonMsgPoJo.MatchMsg;
import cn.edu.tute.netty.jsonMsgPoJo.NoticeMsg;
import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.GameLogicService;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
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
    ConnectManager connectManager;

    public void createRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        Room room = null;
        String roomMaster = redisService.get(ctx.channel().id().toString());
        String firstRoomInfo = redisService.get("roomId:" + roomMaster);
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
            //redis存储新创建的房间信息
            redisService.set("roomId:" + roomMaster, room);
            IdleRoom idleRoom = redisService.get("idleRooms", IdleRoom.class);
            //idleRoom 不为空说明有待加入的房间，需要先判断要新创建的房间是否 已经存在于idle列表
            if (idleRoom != null) {
                List<String> idleRooms = idleRoom.getIdleRooms();
                if (!idleRooms.contains("roomId:" + roomMaster)) {
                    //空闲列表没有这个房间id 就把这个房间id 加入空闲列表
                    idleRoom.getIdleRooms().add("roomId:" + roomMaster);
                    redisService.set("idleRooms", idleRoom);
                }
            } else {
                //把新创建的房间放进idleRooms
                IdleRoom idleRoom1 = new IdleRoom();
                List<String> idleRoomList = new LinkedList<String>();
                idleRoomList.add("roomId:" + roomMaster);
                idleRoom1.setIdleRooms(idleRoomList);
                redisService.set("idleRooms", idleRoom1);
            }
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
        IdleRoom idleRoom = redisService.get("idleRooms", IdleRoom.class);
        List<String> idleRooms = idleRoom.getIdleRooms();
        if (idleRooms.contains(joinRoomId)) {
            String roomInfo = redisService.get("roomId:" + joinRoomId);
            Room room = JSONObject.parseObject(roomInfo, Room.class);
            String userToken=redisService.get(ctx.channel().id().toString());
            room.setPlayer2(userToken);
            redisService.set("roomId:"+joinRoomId,room);
            redisService.set("roomIdForToken:"+room.getPlayer1(),"roomId"+room.getPlayer1());
            redisService.set("roomIdForToken:"+room.getPlayer2(),"roomId"+room.getPlayer1());
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
}
