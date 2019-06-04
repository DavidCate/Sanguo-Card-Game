package cn.edu.tute.web.service;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public interface NewUserInfoOpService {
    String updateName(String newName, HttpServletRequest request, HttpServletResponse response);

    String addFriend(String head,String friendName, HttpServletRequest request, HttpServletResponse response);

    String searchUser(String name, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    String getRecord(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);
}
