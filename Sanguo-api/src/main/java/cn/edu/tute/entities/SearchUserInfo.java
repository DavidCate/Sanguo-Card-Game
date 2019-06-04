package cn.edu.tute.entities;

import java.io.Serializable;

public class SearchUserInfo implements Serializable {
    private String name;
    private String head;
    private String isSuccess;

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(String isSuccess) {
        this.isSuccess = isSuccess;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
