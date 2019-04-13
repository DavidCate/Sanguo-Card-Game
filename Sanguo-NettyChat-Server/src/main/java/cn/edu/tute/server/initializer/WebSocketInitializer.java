package cn.edu.tute.server.initializer;

import cn.edu.tute.server.handler.WebSocketServerHandler;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.handler.timeout.IdleStateHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WebSocketInitializer extends ChannelInitializer<SocketChannel> {
    @Autowired
    private WebSocketServerHandler webSocketServerHandler;

    protected void initChannel(SocketChannel socketChannel) throws Exception {
        ChannelPipeline pipeline=socketChannel.pipeline();
        pipeline.addLast("http-codec", new HttpServerCodec());
        pipeline.addLast("aggregator", new HttpObjectAggregator(65536));
        pipeline.addLast("http-chunked", new ChunkedWriteHandler());
        pipeline.addLast("handler", webSocketServerHandler);
        pipeline.addLast("idleStateHandler", new IdleStateHandler(200, 200, 200));
    }
}
