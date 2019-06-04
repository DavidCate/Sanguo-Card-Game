package cn.edu.tute.server.service;

import com.alibaba.fastjson.JSONObject;
import io.netty.channel.ChannelHandlerContext;
import org.springframework.stereotype.Service;

@Service
public interface MsgHandService {

    void handPrivate(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handWorld(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handReady(JSONObject jsonMsg, ChannelHandlerContext ctx);

//    void handRound(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handPlay(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handEnd(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handOver(JSONObject jsonMsg, ChannelHandlerContext ctx);

//    void handResult(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handToken1(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handToken2(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handCreateRoom(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handJoinRoom(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handMatch(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handGetRoom(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handRound1(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handRound(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handGet(JSONObject jsonMsg, ChannelHandlerContext ctx);

    void handCards(JSONObject jsonMsg, ChannelHandlerContext ctx);
}
