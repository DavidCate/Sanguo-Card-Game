package cn.edu.tute.netty.jsonMsgPoJo;

import java.io.Serializable;

public class CreateRoomMsg implements Serializable {
    private String isSuccess;
    private String errMsg;
    private String roomInfo;

    public String getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(String isSuccess) {
        this.isSuccess = isSuccess;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }

    public String getRoomInfo() {
        return roomInfo;
    }

    public void setRoomInfo(String roomInfo) {
        this.roomInfo = roomInfo;
    }
}
