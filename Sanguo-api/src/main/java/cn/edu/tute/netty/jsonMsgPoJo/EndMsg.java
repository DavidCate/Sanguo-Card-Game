package cn.edu.tute.netty.jsonMsgPoJo;

import java.io.Serializable;

public class EndMsg implements Serializable {
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    private String type="end";

}
