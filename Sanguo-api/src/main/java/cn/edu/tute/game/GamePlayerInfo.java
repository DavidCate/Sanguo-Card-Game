package cn.edu.tute.game;

import java.io.Serializable;

public class GamePlayerInfo implements Serializable {
    private String roomId;

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
