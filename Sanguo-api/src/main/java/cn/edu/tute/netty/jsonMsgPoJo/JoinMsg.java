package cn.edu.tute.netty.jsonMsgPoJo;

import java.io.Serializable;

public class JoinMsg implements Serializable {
    private String type="join";
    private String isSuccess;
    private String errMsg;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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
}
