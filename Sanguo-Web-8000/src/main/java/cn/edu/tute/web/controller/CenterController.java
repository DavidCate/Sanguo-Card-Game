package cn.edu.tute.web.controller;

import cn.edu.tute.web.mapper.UserInfoMapper;
import cn.edu.tute.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/")
public class CenterController {
    @Autowired
    UserService userService;

    @GetMapping(value = "hello")
    public String hello(){
        return "this is a test";
    }

}
