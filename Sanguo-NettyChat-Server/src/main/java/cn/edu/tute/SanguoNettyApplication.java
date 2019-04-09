package cn.edu.tute;


import cn.edu.tute.server.init.InitService;
import cn.edu.tute.server.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;


@EnableRedisHttpSession
@SpringBootApplication
public class SanguoNettyApplication implements CommandLineRunner {

    @Autowired
    private ChatService chatService;

    @Autowired
    private InitService initService;

    public static void main(String[] args) {
        SpringApplication.run(SanguoNettyApplication.class,args);
    }

    public void run(String... args) throws Exception {
        initService.init();
        chatService.run(1111);
    }
}
