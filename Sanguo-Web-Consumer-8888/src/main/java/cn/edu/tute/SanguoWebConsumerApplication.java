package cn.edu.tute;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SanguoWebConsumerApplication {
    public static void main(String[] args) {
        SpringApplication.run(SanguoWebConsumerApplication.class,args);
    }
}
