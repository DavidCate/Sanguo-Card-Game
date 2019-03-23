package spingboot;


import cn.edu.tute.entities.UserInfo;
import cn.edu.tute.entities.UserLoginInfo;
import cn.edu.tute.web.mapper.InitInfoMapper;
import cn.edu.tute.web.mapper.UserInfoMapper;
import cn.edu.tute.web.redis.MybatisRedisCache;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.Test;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;


@RunWith(SpringRunner.class)
@SpringBootTest
public class MyTest {

    @Autowired
    StringRedisTemplate redisTemplate;

    ValueOperations<String,String> stringRedis;

    @Resource
    UserInfoMapper userInfoMapper;

    @Autowired
    DataSource dataSource;

    MybatisRedisCache mybatisRedisCache;

    @Test
    public void test() throws SQLException, IOException {

//        stringRedis=redisTemplate.opsForValue();
//        stringRedis.set("xxx","aaa");
//        Connection connection=dataSource.getConnection();
        SqlSessionFactoryBuilder builder=new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory= builder.build(Resources.getResourceAsStream("mybatis/mybatis-config.xml"));
        SqlSession session=sqlSessionFactory.openSession();
        InitInfoMapper  mapper=session.getMapper(InitInfoMapper .class);
        mapper.selectInitInfo("xxx");
        mapper.selectInitInfo("xxx");
        mapper.selectInitInfo("xxx");
        mapper.selectInitInfo("xxx");

    }


}
