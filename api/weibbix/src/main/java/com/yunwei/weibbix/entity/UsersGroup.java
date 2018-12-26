package com.yunwei.weibbix.entity;

import java.math.BigInteger;

public class UsersGroup {
    private BigInteger groupId;
    private String groupName;
    private boolean enabled;

    public BigInteger getGroupId() {
        return groupId;
    }

    public void setGroupId(BigInteger groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public boolean isEnable() {
        return enabled;
    }

    public void setEnable(boolean enabled) {
        this.enabled = enabled;
    }
}
