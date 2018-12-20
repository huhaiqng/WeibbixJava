package com.yunwei.weibbix.entity;

import java.math.BigInteger;

public class User {
    private Integer userId;
    private String userName;
    private String password;
    private boolean enabled;

//    public User(Integer userId, String userName, String password) {
//        this.userId = userId;
//        this.userName = userName;
//        this.password = password;
//    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
