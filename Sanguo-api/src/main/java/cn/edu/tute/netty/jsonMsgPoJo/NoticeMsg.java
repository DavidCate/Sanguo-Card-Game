package cn.edu.tute.netty.jsonMsgPoJo;

import java.io.Serializable;

public class NoticeMsg implements Serializable {
    private String type="notic";

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    private String userName;
}
