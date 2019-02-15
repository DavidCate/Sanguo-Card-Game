package cn.edu.tute.server.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.Node;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RestConfig {
    Logger logger= LoggerFactory.getLogger(RestConfig.class);
    @Bean
    public RestClient getClient(){
        // 如果有多个从节点可以持续在内部new多个HttpHost，参数1是ip,参数2是HTTP端口，参数3是通信协议
        RestClientBuilder clientBuilder=RestClient.builder(new HttpHost("192.168.153.128",9200,"http"));
        clientBuilder.setMaxRetryTimeoutMillis(60000);
        clientBuilder.setFailureListener(new RestClient.FailureListener(){
            @Override
            public void onFailure(Node node) {
                super.onFailure(node);
                logger.info(node.getName()+"=>节点失败");
            }
        });
        return clientBuilder.build();
    }
}
