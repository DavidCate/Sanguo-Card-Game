package cn.edu.tute.entities;

import java.io.Serializable;

public class UserFriend implements Serializable {
    private String friendImg;
    private String friendName;

    public String getFriendImg() {
        return friendImg;
    }

    public void setFriendImg(String friendImg) {
        this.friendImg = friendImg;
    }

    public String getFriendName() {
        return friendName;
    }

    public void setFriendName(String friendName) {
        this.friendName = friendName;
    }
}
