package cn.edu.tute.entities;

import java.io.Serializable;

public class PlayImg implements Serializable {

    private String imgUrl;

    private String imgInfo;

    public String getImgInfo() {
        return imgInfo;
    }

    public void setImgInfo(String imgInfo) {
        this.imgInfo = imgInfo;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
