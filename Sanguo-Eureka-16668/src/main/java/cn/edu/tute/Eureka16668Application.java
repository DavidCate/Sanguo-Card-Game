package cn.edu.tute;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class Eureka16668Application {
    public static void main(String[] args) {
        SpringApplication.run(Eureka16668Application.class,args);
    }
}
