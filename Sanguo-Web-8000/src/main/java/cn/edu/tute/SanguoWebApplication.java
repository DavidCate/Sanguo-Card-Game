package cn.edu.tute;




import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@EnableRedisHttpSession
@EnableEurekaClient
@EnableDiscoveryClient
public class SanguoWebApplication{
    public static void main(String[] args) {
        SpringApplication.run(SanguoWebApplication.class,args);
    }
}
