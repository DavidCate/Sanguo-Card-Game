package cn.edu.tute.entities.response;

import cn.edu.tute.MyImplements.Response;
import com.alibaba.fastjson.JSON;

public class SuccessResponse implements Response {
    private String IS_SUCCESS = "true";

    public String getIS_SUCCESS() {
        return IS_SUCCESS;
    }

    public void setIS_SUCCESS(String IS_SUCCESS) {
        this.IS_SUCCESS = IS_SUCCESS;
    }

    private String errorMsg;

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public String send() {
        String jsonString = JSON.toJSONString(this);
        return jsonString;
    }
}
