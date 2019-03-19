package cn.edu.tute.server.service;

import cn.edu.tute.server.server.WebSocketServer;
import cn.edu.tute.server.util.PropertyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Properties;

@Component
public class ChatService {
    @Autowired
    PropertyUtil propertyUtil;

    @Autowired
    WebSocketServer webSocketServer;

    public void run(int port) {
        Properties property=propertyUtil.getProperties("netty.properties");
        String webSocketPort=property.getProperty("webSocketPort");
        webSocketServer.run(Integer.valueOf(webSocketPort));
    }
}
