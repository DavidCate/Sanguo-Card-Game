package cn.edu.tute.entities;

import java.io.Serializable;
import java.util.List;

public class InitInfo implements Serializable {
    private String headImg;
    private UserInfo userInfo;
    private List<UserFriend> userFriends;
    private List<PlayImg> playImgs;
    private List<Msg> msgs;

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

    public List<PlayImg> getPlayImgs() {
        return playImgs;
    }

    public void setPlayImgs(List<PlayImg> playImgs) {
        this.playImgs = playImgs;
    }

    public List<Msg> getMsgs() {
        return msgs;
    }

    public void setMsgs(List<Msg> msgs) {
        this.msgs = msgs;
    }

    @Override
    public String toString() {
        return "InitInfo{" +
                "headImg='" + headImg + '\'' +
                ", userInfo=" + userInfo +
                ", userFriends=" + userFriends +
                ", playImgs=" + playImgs +
                ", msgs=" + msgs +
                '}';
    }
}
