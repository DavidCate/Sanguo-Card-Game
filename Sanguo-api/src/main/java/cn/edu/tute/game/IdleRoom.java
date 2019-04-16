package cn.edu.tute.game;

import java.io.Serializable;
import java.util.List;

public class IdleRoom implements Serializable {
    List<String> idleRooms;

    public List<String> getIdleRooms() {
        return idleRooms;
    }

    public void setIdleRooms(List<String> idleRooms) {
        this.idleRooms = idleRooms;
    }
}
