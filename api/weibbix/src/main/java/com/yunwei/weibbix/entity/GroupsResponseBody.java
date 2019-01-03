package com.yunwei.weibbix.entity;

import java.util.List;

public class GroupsResponseBody {

    private Integer pages;
    private List<UsersGroup> groups;

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public List<UsersGroup> getGroups() {
        return groups;
    }

    public void setGroups(List<UsersGroup> groups) {
        this.groups = groups;
    }
}
