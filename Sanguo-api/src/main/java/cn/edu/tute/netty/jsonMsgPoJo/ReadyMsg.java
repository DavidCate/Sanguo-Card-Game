package cn.edu.tute.netty.jsonMsgPoJo;

public class ReadyMsg {
    private String type = "ready";
    private String isSuccess;

    public String getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(String isSuccess) {
        this.isSuccess = isSuccess;
    }
}
