package cn.edu.tute.server.service.impl;

import cn.edu.tute.game.Room;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.GameLogicService;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GamLogicServiceImpl implements GameLogicService {
    @Autowired
    RedisService redisService;

    public void createRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {
        Room room=new Room();
        String roomInfo=JSONObject.toJSONString(room);
//        redisService.set(,roomInfo);
    }

    public void joinRoom(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }

    public void match(JSONObject jsonMsg, ChannelHandlerContext ctx) {

    }
}
