package cn.edu.tute.entities;

import java.io.Serializable;
import java.util.List;

public class InitInfo implements Serializable {
    private String headImg;
    private String userName;
    private List<UserFriend> userFriends;
    private List<PlayImg> playImgs;
    private List<Msg> msgs;
    private List<GameRecord> gameRecords;
    private List<Task> tasks;

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<GameRecord> getGameRecords() {
        return gameRecords;
    }

    public void setGameRecords(List<GameRecord> gameRecords) {
        this.gameRecords = gameRecords;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

}
