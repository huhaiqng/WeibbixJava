package com.yunwei.weibbix.entity;

import java.util.List;

public class PagesListResponse {
    private Integer pages;
    private List<?> hostList;

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public List<?> getHostList() {
        return hostList;
    }

    public void setHostList(List<?> hostList) {
        this.hostList = hostList;
    }
}
