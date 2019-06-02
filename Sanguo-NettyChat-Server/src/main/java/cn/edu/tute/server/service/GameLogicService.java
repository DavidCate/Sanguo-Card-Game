package cn.edu.tute.server.service;

import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import org.springframework.stereotype.Service;

@Service
public interface GameLogicService {
    void createRoom(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void joinRoom(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void match(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void getRoom(JSONObject jsonMsg, ChannelHandlerContext ctx);
}
