package cn.edu.tute.web.service;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public interface UserService {
    String login(String username, String password, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);
}
