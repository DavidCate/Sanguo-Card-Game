package cn.edu.tute.entities;

import java.io.Serializable;

public class UserInfo implements Serializable {
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
