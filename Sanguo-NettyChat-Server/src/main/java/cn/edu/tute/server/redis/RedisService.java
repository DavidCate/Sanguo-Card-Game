package cn.edu.tute.server.redis;

import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    @Autowired
    private StringRedisTemplate redisTemplate;

    /**
     *  默认30分钟失效
     */
    private static final long WEEK_SECONS=30*60;

    /**
     * 默认30分钟失效
     * @param key
     * @param value
     */
    public void set(String key,Object value){
        redisTemplate.opsForValue().set(key, JSON.toJSONString(value),WEEK_SECONS, TimeUnit.SECONDS);
    }

    /**
     * 自定义失效时长存储key value
     * @param key
     * @param value
     * @param expireTime
     */
    public void set(String key,Object value,long expireTime){
        redisTemplate.opsForValue().set(key,JSON.toJSONString(value),expireTime,TimeUnit.SECONDS);
    }

    /**
     * 判断是否存在 key
     * @param key
     * @return
     */
    public boolean exists(final String key){
        return redisTemplate.hasKey(key);
    }

    /**
     * 普通获取value
     * @param key
     * @return
     */
    public String get(String key){
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 获取对应类型的对象
     * @param key
     * @param clazz
     * @param <T>
     * @return
     */
    public <T> T get(String key,Class<T> clazz){
        String s=get(key);
        if (s ==null){
            return null;
        }
        //从redis 中获取到的json串 有转义\需要先转换一下 在转成pojo
        String res=(String) JSON.parse(s);
        return JSON.parseObject(res,clazz);
    }

    public void delete(String key){
        redisTemplate.delete(key);
    }
}
