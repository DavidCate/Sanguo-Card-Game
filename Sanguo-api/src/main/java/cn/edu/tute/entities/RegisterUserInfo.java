package cn.edu.tute.entities;

public class RegisterUserInfo {
    @Override
    public String toString() {
        return "RegisterUserInfo{" +
                "userCount='" + userCount + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", telNum=" + telNum +
                ", sex=" + sex +
                '}';
    }

    private String userCount;
    private String userName;
    private String password;
    private String telNum;
    //男：0，女：1
    private int sex;

    public String getUserCount() {
        return userCount;
    }

    public void setUserCount(String userCount) {
        this.userCount = userCount;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelNum() {
        return telNum;
    }

    public void setTelNum(String telNum) {
        this.telNum = telNum;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }
}
