package cn.edu.tute.server.service.impl;

import cn.edu.tute.game.IdleRoom;
import cn.edu.tute.game.Room;
import cn.edu.tute.netty.jsonMsgPoJo.CreateRoomMsg;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.GameLogicService;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GamLogicServiceImpl implements GameLogicService {
    @Autowired
    RedisService redisService;

    public void createRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        Room room=null;
        String roomMaster = redisService.get(ctx.channel().id().toString());
        String firstRoomInfo=redisService.get("roomId:"+roomMaster);
        //判断用户是否存在
        if (roomMaster != null) {
            if (firstRoomInfo==null){
                //创建房间
                room = new Room();
                room.setPlayer1(roomMaster);
                room.setName(roomMaster);
                room.setReadyStatus("0");
                room.setRound("0");
            }
        }
        if (room!=null){
            //redis存储新创建的房间信息
            String roomInfo = JSONObject.toJSONString(room);
            redisService.set("roomId:"+roomMaster,roomInfo);
            IdleRoom idleRoom=redisService.get("idleRooms", IdleRoom.class);
            //idleRoom 不为空说明有待加入的房间，需要先判断要新创建的房间是否 已经存在于idle列表
            if (idleRoom!=null){
                List<String> idleRooms=idleRoom.getIdleRooms();
                if (!idleRooms.contains("roomId:"+roomMaster)){
                   //空闲列表没有这个房间id 就把这个房间id 加入空闲列表
                    idleRoom.getIdleRooms().add("roomId:"+roomMaster);
                    redisService.set("idleRooms",JSONObject.toJSONString(idleRoom));
                }
            }else {
                //把新创建的房间放进idleRooms
                IdleRoom idleRoom1=new IdleRoom();
                List<String> idleRoomList=new ArrayList<String>();
                idleRoomList.add("roomId:"+roomMaster);
                idleRoom1.setIdleRooms(idleRoomList);
                String jsonIdleRooms=JSONObject.toJSONString(idleRoom1);
                redisService.set("idleRooms",jsonIdleRooms);
            }
        }else {
            //该用户已经存在一个房间
            CreateRoomMsg msg=new CreateRoomMsg();
            msg.setIsSuccess("false");
            msg.setErrMsg("该用户已经创建了房间");
            msg.setRoomInfo(firstRoomInfo);
            ctx.channel().write(new TextWebSocketFrame(JSONObject.toJSONString(msg)));
        }
    }

    public void joinRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
            redisService.get("idleRooms");
    }

    public void match(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }
}
