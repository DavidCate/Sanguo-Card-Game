package cn.edu.tute.entities;

import java.io.Serializable;

public class UserFriend implements Serializable {
    private String friendId;
    private String firendName;

    public String getFriendId() {
        return friendId;
    }

    public void setFriendId(String friendId) {
        this.friendId = friendId;
    }

    public String getFirendName() {
        return firendName;
    }

    public void setFirendName(String firendName) {
        this.firendName = firendName;
    }
}
