package cn.edu.tute.game;

import java.io.Serializable;
import java.util.Set;

public class RoomList implements Serializable {
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    private String type="roomlist";
    private Set<String> roomlist;

    public Set<String> getRoomlist() {
        return roomlist;
    }

    public void setRoomlist(Set<String> roomlist) {
        this.roomlist = roomlist;
    }
}
