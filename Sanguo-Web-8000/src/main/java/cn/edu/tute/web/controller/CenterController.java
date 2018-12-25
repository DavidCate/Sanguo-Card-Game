package cn.edu.tute.web.controller;

import cn.edu.tute.web.mapper.UserInfoMapper;
import cn.edu.tute.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

//restcontrller 只返回json数据 而ModelAndView不受影响
//如果没有配置controller 直接访问类似localhost：8000/xxx 会默认到static或public文件夹自动匹配页面
@RestController
public class CenterController {
    @Autowired
    UserService userService;

    @GetMapping(value = "hello")
    public String hello(){
        return "this is a test";
    }

    @GetMapping("login")
    public ModelAndView loginPage(){
        ModelAndView modelAndView=new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @PostMapping("login")
    public String login(String username,String password,HttpServletRequest httpServletRequest){
        return userService.login(username,password,httpServletRequest);

    }

}
