package com.yunwei.weibbix.oauth.entity;

import org.springframework.security.core.userdetails.User;

import java.util.Collections;

public class MyUserDetails extends User{

    private com.yunwei.weibbix.oauth.entity.User user;

    public MyUserDetails(com.yunwei.weibbix.oauth.entity.User user) {
        super(user.getUserName(), user.getPassword(), true, true, true, true, Collections.EMPTY_SET);
        this.user = user;
    }

    public com.yunwei.weibbix.oauth.entity.User getUser() {
        return user;
    }

    public void setUser(com.yunwei.weibbix.oauth.entity.User user) {
        this.user = user;
    }

}
