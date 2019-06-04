package cn.edu.tute.netty.jsonMsgPoJo;

public class ResultMsg {
    private String type="result";
    private String value;
    private String insert="false";

    public String getInsert() {
        return insert;
    }

    public void setInsert(String insert) {
        this.insert = insert;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
