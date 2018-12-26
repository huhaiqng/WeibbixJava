package com.yunwei.weibbix.entity;

import java.util.List;
import java.util.Set;

public class AjaxResponseBody {
    private String status;
    private String message;
    private List<?> result;

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

    public List<?> getResult() {
        return result;
    }

    public void setResult(List<?> result) {
        this.result = result;
    }
}
