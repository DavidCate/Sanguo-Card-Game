package cn.edu.tute.server.component;

import cn.edu.tute.server.redis.RedisService;
import io.netty.channel.ChannelHandlerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ConnectManager {
    ConcurrentHashMap<String,ChannelHandlerContext> connections=new ConcurrentHashMap<String, ChannelHandlerContext>();

    @Autowired
    RedisService redisService;

    public  ConcurrentHashMap<String, ChannelHandlerContext> getConnections() {
        return connections;
    }
    public  void setConnections(ConcurrentHashMap<String, ChannelHandlerContext> connection) {
        this.connections=connection;
    }
}
