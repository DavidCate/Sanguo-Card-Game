package cn.edu.tute.web.service.impl;


import cn.edu.tute.entities.AddFriendInfo;
import cn.edu.tute.entities.RegisterUserInfo;
import cn.edu.tute.entities.SearchUserInfo;
import cn.edu.tute.entities.UserLoginInfo;
import cn.edu.tute.entities.response.FailureResponse;
import cn.edu.tute.entities.response.SuccessResponse;
import cn.edu.tute.web.mapper.NewUserInfoOpMapper;
import cn.edu.tute.web.mapper.UserInfoMapper;
import cn.edu.tute.web.redis.RedisService;
import cn.edu.tute.web.service.UserService;
import com.alibaba.fastjson.JSON;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.UUID;


@Component
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    UserInfoMapper userInfoMapper;

    @Autowired
    NewUserInfoOpMapper newUserInfoOpMapper;

    @Autowired
    StringRedisTemplate redisTemplate;

    @Autowired
    RedisService redisService;

    public String login(String username, String password, HttpServletRequest request, HttpServletResponse httpServletResponse) {
        HttpSession session = request.getSession();
        String sessionId = session.getId();
        session.setAttribute("username", username);
//        logger.warn("sessionId=====>"+sessionId);
//        UserLoginInfo userLoginInfo=redisService.get(sessionId,UserLoginInfo.class);
        UserLoginInfo userLoginInfo = null;
        if (userLoginInfo != null) {
//            logger.warn(userInfo.toString());
            //判断userinfo是否存在,如果存在说明已经登录过,校验token
            if (session.getAttribute("token") != null) {
                if (validateUserInfo((String) session.getAttribute("token"), userLoginInfo.getToken())) {
                    FailureResponse response = new FailureResponse();
                    response.setErrorMsg("用户已经登录过,token校验成功");
                    return response.send();
                } else {
                    redisService.delete(sessionId);
                    FailureResponse response = new FailureResponse();
                    response.setErrorMsg("token校验失败，重新登录");
                    return response.send();
                }
            } else {
                redisService.delete(sessionId);
                FailureResponse response = new FailureResponse();
                response.setErrorMsg("请重新登录");
                return response.send();
            }

        } else {
            //第一次登录
            if (StringUtils.isNotBlank(username)) {
//                UserLoginInfo test=userInfoMapper.getUserLoginInfo(username);
//                logger.warn(test.toString());
                userLoginInfo = userInfoMapper.getUserLoginInfo(username);
                if (userLoginInfo == null) {
                    FailureResponse response = new FailureResponse();
                    response.setErrorMsg("用户不存在，请重新登录");
                    return response.send();
                }
                if (validateUserInfo(username, password, userLoginInfo)) {
                    UUID tokenId = UUID.randomUUID();
                    //校验通过，生成Cookie 加入token信息
                    String sessionInfo;
                    sessionInfo = "sessionId:" + session.getId() + "#tokenId:" + tokenId;
                    Cookie cookie = new Cookie("Sanguo_SessionInfo", sessionInfo);
                    cookie.setMaxAge(60 * 30);
                    httpServletResponse.addCookie(cookie);
                    userLoginInfo.setToken(tokenId.toString());
                    userLoginInfo.setSessionID(sessionId);
                    redisTemplate.opsForValue().set("tokenId:"+tokenId,username);
//                    redisService.set(session.toString(),JSON.toJSONString(userLoginInfo));
//                    redisService.set(tokenId.toString(), JSON.toJSONString(userLoginInfo));
                    SuccessResponse response = new SuccessResponse();
                    response.setErrorMsg("登录成功");
                    return response.send();
                } else {
                    FailureResponse response = new FailureResponse();
                    response.setErrorMsg("账号密码有误，请重新登录");
                    return response.send();
                }
            } else {
                FailureResponse response = new FailureResponse();
                response.setErrorMsg("用户名不能为空！");
                return response.send();
            }
        }
    }

    public String register(RegisterUserInfo registerUserInfo) {
        RegisterUserInfo selected = userInfoMapper.getRegisterUserInfo(registerUserInfo.getUsername());
        if (selected != null) {
            FailureResponse failureResponse = new FailureResponse();
            failureResponse.setErrorMsg("用户名已存在");
            return failureResponse.send();
        } else {
            try {
                userInfoMapper.registUserInfo(registerUserInfo);
            } catch (Exception e) {
                e.printStackTrace();
                FailureResponse failureResponse = new FailureResponse();
                failureResponse.setErrorMsg("插入注册信息失败");
                return failureResponse.send();
            }
            SuccessResponse successResponse = new SuccessResponse();
            successResponse.setErrorMsg("注册成功");
            return successResponse.send();
        }

    }

    private boolean validateUserInfo(String token, String userInfoToken) {
        if (token.equals(userInfoToken)) {
            return true;
        } else {
            return false;
        }
    }

    private boolean validateUserInfo(String username, String password, UserLoginInfo userLoginInfo) {
        if (username.equals(userLoginInfo.getUsername()) && password.equals(userLoginInfo.getPassword())) {
            return true;
        } else {
            return false;
        }
    }


}
