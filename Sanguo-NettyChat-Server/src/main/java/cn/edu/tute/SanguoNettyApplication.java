package cn.edu.tute;

import cn.edu.tute.server.service.ChatServer;
import org.springframework.beans.BeansException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import javax.annotation.Resource;

@SpringBootApplication
public class SanguoNettyApplication implements CommandLineRunner {

    @Resource
    private ChatServer chatServer;

    public static void main(String[] args) {
        SpringApplication.run(SanguoNettyApplication.class,args);
    }

    public void run(String... args) throws Exception {
        chatServer.run();
    }
}
