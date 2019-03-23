package cn.edu.tute.web.redis;

import org.apache.ibatis.cache.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;


public class MybatisRedisCache implements Cache {
    private String id;

    private final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();

    private RedisService redisService;

    private RedisTemplate redisTemplate;

    public MybatisRedisCache() {
    }

    public String getId() {
        return this.id;
    }

    public MybatisRedisCache(String id) {
        if (id == null) {
            throw new IllegalArgumentException("Cache instances require an ID");
        }
        this.id = id;
    }

    public void putObject(Object key, Object value) {
        redisService.set(key.toString(), value);
    }

    public Object getObject(Object o) {
        return redisService.get(o.toString());
    }

    public Object removeObject(Object key) {
        redisService.set(key.toString(), "", 0);
        return key;
    }

    public void clear() {
        redisTemplate.getConnectionFactory().getConnection().flushDb();
    }

    public int getSize() {
        return redisTemplate.getConnectionFactory().getConnection().dbSize().intValue();
    }

    public ReadWriteLock getReadWriteLock() {
        return this.readWriteLock;
    }
}
