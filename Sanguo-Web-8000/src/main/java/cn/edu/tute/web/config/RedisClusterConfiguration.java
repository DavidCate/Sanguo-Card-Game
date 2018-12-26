package cn.edu.tute.web.config;

import cn.edu.tute.web.properties.RedisClusterConfigurationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisClusterConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

@Configuration
public class RedisClusterConfiguration {
    @Autowired
    RedisClusterConfigurationProperties redisClusterConfigurationProperties;

    @Autowired
    RedisConnectionFactory redisConnectionFactory;

    @Bean
    public RedisConnectionFactory connectionFactory() {
        return new JedisConnectionFactory(
                new org.springframework.data.redis.connection.RedisClusterConfiguration(redisClusterConfigurationProperties.getNodes())
        );
    }

    @Bean
    public RedisClusterConnection getRedisClusterConnection(){
        return redisConnectionFactory.getClusterConnection();
    }

}
