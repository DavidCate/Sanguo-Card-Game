package cn.edu.tute.server.service.impl;

import cn.edu.tute.server.component.ConnectManager;
import cn.edu.tute.server.redis.RedisService;
import cn.edu.tute.server.service.MsgHandService;
import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import org.springframework.beans.factory.annotation.Autowired;

public class MsgHandServiceImpl implements MsgHandService {
    @Autowired
    ConnectManager connectManager;

    @Autowired
    RedisService redisService;

    public void handPrivate(JSONObject jsonMsg, ChannelHandlerContext ctx) {

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
}
