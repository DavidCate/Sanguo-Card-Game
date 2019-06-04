package cn.edu.tute.web.service.impl;

import cn.edu.tute.entities.GameUserInfo;
import cn.edu.tute.entities.Record;
import cn.edu.tute.entities.SearchUserInfo;
import cn.edu.tute.web.mapper.NewUserInfoOpMapper;
import cn.edu.tute.web.service.NewUserInfoOpService;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class NewUserInfoOpServiceImpl implements NewUserInfoOpService {

    @Autowired
    NewUserInfoOpMapper newUserInfoOpMapper;

    public String updateName(String newName, HttpServletRequest request, HttpServletResponse response) {
        HttpSession httpSession=request.getSession();
        String username=httpSession.getAttribute("username").toString();
        if (username!=null){
            System.out.println(username+"<-----------------------");
        }
        boolean res=newUserInfoOpMapper.updateName(username,newName);
        if (res){
            return "true";
        }else {
            return "false";
        }
    }

    public String addFriend(String head,String friendName, HttpServletRequest request, HttpServletResponse response) {
        HttpSession httpSession=request.getSession();
        String username=httpSession.getAttribute("username").toString();
        if (newUserInfoOpMapper.addFriend(head,username,friendName)){
            return "true";
        }else {
            return "false";
        }
    }

    //通过username查询  不是昵称查询
    public String searchUser(String username, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        SearchUserInfo searchUserInfo=newUserInfoOpMapper.searchUser(username);
        if (searchUserInfo!=null){
            searchUserInfo.setIsSuccess("true");
            return JSON.toJSONString(searchUserInfo);
        }else {
            searchUserInfo.setIsSuccess("false");
            return JSON.toJSONString(searchUserInfo);
        }
    }

    public String getRecord(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        HttpSession httpSession=httpServletRequest.getSession();
        String username=httpSession.getAttribute("username").toString();
        GameUserInfo gameUserInfo= newUserInfoOpMapper.selectUserInfo(username);
        List<Record> list=newUserInfoOpMapper.getRecord(gameUserInfo.getId());
        return JSON.toJSONString(list);
    }
}
