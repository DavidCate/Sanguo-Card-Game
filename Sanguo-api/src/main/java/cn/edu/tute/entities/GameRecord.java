package cn.edu.tute.entities;

import java.io.Serializable;

public class GameRecord implements Serializable {
    private String time0;
    private String player;
    private String result;

    public String getTime0() {
        return time0;
    }

    public void setTime0(String time0) {
        this.time0 = time0;
    }

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
