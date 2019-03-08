package cn.edu.tute.web.service.impl;


import cn.edu.tute.entities.RegisterUserInfo;
import cn.edu.tute.entities.UserInfo;
import cn.edu.tute.entities.response.FailureResponse;
import cn.edu.tute.entities.response.SuccessResponse;
import cn.edu.tute.web.mapper.UserInfoMapper;
import cn.edu.tute.web.redis.RedisService;
import cn.edu.tute.web.service.UserService;
import com.alibaba.fastjson.JSON;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.UUID;

@Component
public class UserServiceImpl implements UserService {
    private static final Logger logger= LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    UserInfoMapper userInfoMapper;

    @Autowired
    RedisService redisService;

    public String login(String username, String password, HttpServletRequest request, HttpServletResponse httpServletResponse) {
        HttpSession session=request.getSession();
        String sessionId=session.getId();
        UserInfo userInfo=redisService.get(sessionId,UserInfo.class);
        if (userInfo!=null){
            logger.warn(userInfo.toString());
            //判断userinfo是否存在,如果存在说明已经登录过,校验token
            if (validateUserInfo((String) session.getAttribute("token"),userInfo.getToken())){
                FailureResponse response=new FailureResponse();
                response.setErrorMsg("用户已经登录过,token校验成功");
                return response.send();
            }else {
                redisService.delete(sessionId);
                FailureResponse response=new FailureResponse();
                response.setErrorMsg("token校验失败，重新登录");
                return response.send();
            }
        }else {
            //第一次登录
            if (StringUtils.isNotBlank(username)){
                UserInfo test=userInfoMapper.getUserInfo(username);
                logger.warn(test.toString());
                userInfo=userInfoMapper.getUserInfo(username);
                if (userInfo==null){
                    FailureResponse response=new FailureResponse();
                    response.setErrorMsg("用户不存在，请重新登录");
                    return response.send();
                }
                if (validateUserInfo(username,password,userInfo)){
                    UUID tokenId=UUID.randomUUID();
                    //校验通过，生成Cookie 加入token信息
                    Cookie cookie=new Cookie("JSESSIONID",session.getId());
                    cookie.setMaxAge(60*30);
                    httpServletResponse.addCookie(cookie);
                    userInfo.setToken(tokenId.toString());
                    userInfo.setSessionID(sessionId);
                    redisService.set(sessionId,JSON.toJSONString(userInfo));
                    SuccessResponse response=new SuccessResponse();
                    response.setErrorMsg("登录成功");
                    return response.send();
                }else {
                    FailureResponse response=new FailureResponse();
                    response.setErrorMsg("账号密码有误，请重新登录");
                    return response.send();
                }
            }else {
                FailureResponse response=new FailureResponse();
                response.setErrorMsg("用户名不能为空！");
                return response.send();
            }
        }
    }

    public String register(RegisterUserInfo registerUserInfo) {
        RegisterUserInfo selected=userInfoMapper.getRegisterUserInfo(registerUserInfo.getUserCount());
        if (selected!=null){
            FailureResponse failureResponse=new FailureResponse();
            failureResponse.setErrorMsg("用户名已存在");
            return failureResponse.send();
        }else {
            try {
                userInfoMapper.registUserInfo(registerUserInfo);
            }catch (Exception e){
                e.printStackTrace();
                FailureResponse failureResponse=new FailureResponse();
                failureResponse.setErrorMsg("插入注册信息失败");
                return failureResponse.send();
            }
                SuccessResponse successResponse=new SuccessResponse();
                successResponse.setErrorMsg("注册成功");
                return successResponse.send();
        }
    }

    private boolean validateUserInfo(String token, String userInfoToken) {
        if (token.equals(userInfoToken)){
            return true;
        }else {
            return false;
        }
    }

    private boolean validateUserInfo(String username, String password, UserInfo userInfo) {
        if (username.equals(userInfo.getUsername()) && password.equals(userInfo.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

}
