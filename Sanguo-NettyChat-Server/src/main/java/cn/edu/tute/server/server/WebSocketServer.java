package cn.edu.tute.server.server;

import cn.edu.tute.server.initializer.WebSocketInitializer;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WebSocketServer{
    private static final Logger logger= LoggerFactory.getLogger(WebSocketServer.class);

    private EventLoopGroup bossGroup=new NioEventLoopGroup();

    private EventLoopGroup workGroup=new NioEventLoopGroup();

    private ServerBootstrap serverBootstrap=new ServerBootstrap();

    @Autowired
    private WebSocketInitializer webSocketInitializer;

    public WebSocketServer(){
        logger.info("WebSocketServer 初始化。。。");
    }

    public void run(int port) {
        serverBootstrap.group(bossGroup,workGroup).channel(NioServerSocketChannel.class).option(ChannelOption.SO_BACKLOG, 1024)
                .childOption(ChannelOption.TCP_NODELAY, true)
                .childOption(ChannelOption.SO_KEEPALIVE, true)
                .childOption(ChannelOption.RCVBUF_ALLOCATOR, new AdaptiveRecvByteBufAllocator())
                .childHandler(webSocketInitializer);
        logger.info("开始监听");
        try {
            ChannelFuture channelFuture=serverBootstrap.bind("192.168.43.189",port).sync();
            channelFuture.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            logger.warn("服务异常，结束服务");
            bossGroup.shutdownGracefully();
            logger.warn("bossGroup释放资源");
            workGroup.shutdownGracefully();
            logger.warn("workGroup释放资源");
            e.printStackTrace();
        }

    }
}
