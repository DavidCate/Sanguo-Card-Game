package cn.edu.tute.entities.response;

import cn.edu.tute.entities.UserFriend;
import cn.edu.tute.entities.UserInfo;
import com.alibaba.fastjson.JSON;

import java.util.List;

public class InitResponse {
    private String headImg;
    private UserInfo userInfo;
    private List<UserFriend> userFriends;
    private List<String> playImg;
    private List<String> msgs;

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public List<UserFriend> getUserFriends() {
        return userFriends;
    }

    public void setUserFriends(List<UserFriend> userFriends) {
        this.userFriends = userFriends;
    }

    public List<String> getPlayImg() {
        return playImg;
    }

    public void setPlayImg(List<String> playImg) {
        this.playImg = playImg;
    }

    public List<String> getMsgs() {
        return msgs;
    }

    public void setMsgs(List<String> msgs) {
        this.msgs = msgs;
    }
    public String send(){
        String jsonString= JSON.toJSONString(this);
        return jsonString;
    }
}
