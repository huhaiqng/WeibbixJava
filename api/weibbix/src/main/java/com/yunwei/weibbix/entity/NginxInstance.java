package com.yunwei.weibbix.entity;

public class NginxInstance {
    private String id;
    private String ip;
    private Integer http_port;
    private Integer https_port;
    private String name;
    private String dir;
    private String env;
    private boolean allocated;
    private String cluster;
    private String project;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getHttp_port() {
        return http_port;
    }

    public void setHttp_port(Integer http_port) {
        this.http_port = http_port;
    }

    public Integer getHttps_port() {
        return https_port;
    }

    public void setHttps_port(Integer https_port) {
        this.https_port = https_port;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDir() {
        return dir;
    }

    public void setDir(String dir) {
        this.dir = dir;
    }

    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }

    public boolean isAllocated() {
        return allocated;
    }

    public void setAllocated(boolean allocated) {
        this.allocated = allocated;
    }

    public String getCluster() {
        return cluster;
    }

    public void setCluster(String cluster) {
        this.cluster = cluster;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }
}
