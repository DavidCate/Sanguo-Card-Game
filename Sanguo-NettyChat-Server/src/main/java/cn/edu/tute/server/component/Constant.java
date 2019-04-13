package cn.edu.tute.server.component;

import cn.edu.tute.entities.Constans;
import io.netty.channel.ChannelHandlerContext;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class Constant {
    public ConcurrentHashMap<String, ChannelHandlerContext> getConnections() {
        return connections;
    }

    public void setConnections(ConcurrentHashMap<String, ChannelHandlerContext> connections) {
        this.connections = connections;
    }

    private  ConcurrentHashMap<String, ChannelHandlerContext> connections=new ConcurrentHashMap<String,ChannelHandlerContext>();
}
