package cn.edu.tute.entities.response;

import cn.edu.tute.MyImplements.Response;
import com.alibaba.fastjson.JSON;

public class FailureResponse implements Response {
    private static final String IS_SUCCESS = "success";

    private String errorMsg;

    public static String getIsSuccess() {
        return IS_SUCCESS;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public String send() {
        String jsonString=JSON.toJSONString(this);
        return jsonString;
    }
}
