package cn.edu.tute.web.controller;

import cn.edu.tute.web.redis.RedisService;
import cn.edu.tute.web.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

//restcontrller 只返回json数据 而ModelAndView不受影响
//如果没有配置controller 直接访问类似localhost：8000/xxx 会默认到static或public文件夹自动匹配页面
@RestController
public class CenterController {
    @Autowired
    UserService userService;

    @GetMapping(value = "hello")
    public String hello() {
        return "this is a test";
    }

    @GetMapping("login")
    public ModelAndView loginPage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @PostMapping("login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, HttpServletRequest httpServletRequest) {
            return userService.login(username, password, httpServletRequest);
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
