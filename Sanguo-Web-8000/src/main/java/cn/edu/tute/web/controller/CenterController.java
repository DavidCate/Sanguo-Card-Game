package cn.edu.tute.web.controller;


import cn.edu.tute.entities.RegisterUserInfo;
import cn.edu.tute.web.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

//restcontrller 只返回json数据 而ModelAndView不受影响
//如果没有配置controller 直接访问类似localhost：8000/xxx 会默认到static或public文件夹自动匹配页面
@RestController
@RequestMapping("/")
public class CenterController {
    private static final Logger logger= LoggerFactory.getLogger(CenterController.class);

    @Autowired
    DataSource  dataSource;

    @Autowired
    UserService userService;

    @RequestMapping("/")
    public ModelAndView index(ModelAndView modelAndView) throws IOException {
        modelAndView.setViewName("/html/login");
        return modelAndView;
    }

    @RequestMapping("/datasource")
    public String getDataSourceInfo(){
        return dataSource.getClass().toString();
    }

    @GetMapping(value = "hello")
    public String hello() {
        return "this is a test";
    }

    @GetMapping("login")
    public ModelAndView loginPage(ModelAndView modelAndView) {
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @PostMapping("login")
    public String login(@RequestParam("loginPasswd") String username, @RequestParam("loginPasswd") String password, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        logger.info("this is a test");
        return userService.login(username, password, httpServletRequest,httpServletResponse);
    }

    @PostMapping("register")
    public String register(RegisterUserInfo registerUserInfo){
        return userService.register(registerUserInfo);
    }

    @RequestMapping("xxx")
    public String xxx(@RequestParam("xxx") String xxx) {
        System.out.println(xxx);
        return "xxx";
    }

    @GetMapping("test")
    public String test() {
        return "success";
    }

    @RequestMapping(value = "/first", method = RequestMethod.GET)
    public Map<String, Object> firstResp(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        request.getSession().setAttribute("request Url", request.getRequestURL());
        map.put("request Url", request.getRequestURL());
        return map;
    }

    @RequestMapping(value = "/sessions", method = RequestMethod.GET)
    public Object sessions(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("sessionId", request.getSession().getId());
        map.put("message", request.getSession().getAttribute("loginStatus"));
        return map;
    }
}
