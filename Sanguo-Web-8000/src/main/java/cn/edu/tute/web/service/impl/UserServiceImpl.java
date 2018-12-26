package cn.edu.tute.web.service.impl;

import cn.edu.tute.entities.UserInfo;
import cn.edu.tute.web.mapper.UserInfoMapper;
import cn.edu.tute.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserInfoMapper userInfoMapper;

    @Autowired
    RedisTemplate<String,String> redisTemplate;

    public String login(String username, String password,HttpServletRequest request ) {

        if (username.equals("")||password.equals("")){
            return "false";
        }else {
            UserInfo userInfo=userInfoMapper.getUserInfo(username);
            if (userInfo.getPassword().equals(password)){
                //登录成功
                HttpSession session=request.getSession();


            }
        }
        return null;
    }
}
