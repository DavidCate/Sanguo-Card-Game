package spingboot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("cn.edu.tute.web.mapper")
public class AppTest {
    public static void main(String[] args) {
        SpringApplication.run(AppTest.class,args);
    }
}
