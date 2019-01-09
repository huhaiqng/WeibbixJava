package com.yunwei.weibbix.entity;

import java.util.Date;

public class Host {
    private String hostId;
    private String hostName;
    private String ip;
    private String envType;
    private String hostGroup;
    private String place;
    private String rootPassword;
    private Boolean allocated;
    private Date createdAt;
    private String osVersion;
    private String configuration;
    private String hostType;
    private String esxiIp;
    private Boolean enabled;

    public String getHostId() {
        return hostId;
    }

    public void setHostId(String hostId) {
        this.hostId = hostId;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getEnvType() {
        return envType;
    }

    public void setEnvType(String envType) {
        this.envType = envType;
    }

    public String getHostGroup() {
        return hostGroup;
    }

    public void setHostGroup(String hostGroup) {
        this.hostGroup = hostGroup;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getRootPassword() {
        return rootPassword;
    }

    public void setRootPassword(String rootPassword) {
        this.rootPassword = rootPassword;
    }

    public Boolean getAllocated() {
        return allocated;
    }

    public void setAllocated(Boolean allocated) {
        this.allocated = allocated;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getOsVersion() {
        return osVersion;
    }

    public void setOsVersion(String osVersion) {
        this.osVersion = osVersion;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }

    public String getHostType() {
        return hostType;
    }

    public void setHostType(String hostType) {
        this.hostType = hostType;
    }

    public String getEsxiIp() {
        return esxiIp;
    }

    public void setEsxiIp(String esxiIp) {
        this.esxiIp = esxiIp;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
