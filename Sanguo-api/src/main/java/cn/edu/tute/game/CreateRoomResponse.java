package cn.edu.tute.game;

import java.io.Serializable;

public class CreateRoomResponse implements Serializable {
    private String type="createRoom";
    private String errMsg;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }
}
