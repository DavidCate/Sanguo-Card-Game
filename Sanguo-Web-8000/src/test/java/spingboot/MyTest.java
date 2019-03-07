package spingboot;


import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.Test;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;


@RunWith(SpringRunner.class)
@SpringBootTest
public class MyTest {

    @Autowired
    StringRedisTemplate redisTemplate;

    ValueOperations<String,String> stringRedis;

    @Autowired
    DataSource dataSource;

    @Test
    public void test() throws SQLException {
//        stringRedis=redisTemplate.opsForValue();
//        stringRedis.set("xxx","aaa");
        Connection connection=dataSource.getConnection();
        System.out.println(dataSource.getClass());
    }


}
