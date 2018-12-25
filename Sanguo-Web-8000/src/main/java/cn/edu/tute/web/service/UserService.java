package cn.edu.tute.web.service;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
    String login(String username, String password, HttpServletRequest httpServletRequest);
}
