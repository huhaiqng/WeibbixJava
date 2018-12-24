package com.yunwei.weibbix.entity;

import java.util.Set;

public class AjaxResponseBody {
    private String status;
    private String message;
    private Set<?> result;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Set<?> getResult() {
        return result;
    }

    public void setResult(Set<?> result) {
        this.result = result;
    }
}
