package spingboot;


import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.Test;


@RunWith(SpringRunner.class)
@SpringBootTest
public class MyTest {

    @Autowired
    StringRedisTemplate redisTemplate;

    ValueOperations<String,String> stringRedis;

    @Test
    public void test() {
        stringRedis=redisTemplate.opsForValue();
        stringRedis.set("xxx","aaa");
    }


}
