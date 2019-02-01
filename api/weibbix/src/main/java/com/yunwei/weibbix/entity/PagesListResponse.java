package com.yunwei.weibbix.entity;

import java.util.List;

public class PagesListResponse {
    private Integer pages;
    private List<?> pageList;

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public List<?> getPageList() {
        return pageList;
    }

    public void setPageList(List<?> pageList) {
        this.pageList = pageList;
    }
}
