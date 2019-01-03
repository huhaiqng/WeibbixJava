package com.yunwei.weibbix.entity;

import java.util.List;

public class UsersResponseBody {
    private Integer pages;
    private List<User> users;

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
