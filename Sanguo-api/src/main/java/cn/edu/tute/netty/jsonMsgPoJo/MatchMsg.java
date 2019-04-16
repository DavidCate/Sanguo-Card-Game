package cn.edu.tute.netty.jsonMsgPoJo;

import java.io.Serializable;

public class MatchMsg implements Serializable {
    private String type="match";
    private String isSuccess;
    private String errMsg;

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
