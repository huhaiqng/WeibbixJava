package com.yunwei.weibbix.entity;

public class ZookeeperInstance {
    private String id;
    private String ip;
    private Integer port;
    private String name;
    private String dir;
    private String env;
    private String check_port;
    private String data_port;
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

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
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

    public String getCheck_port() {
        return check_port;
    }

    public void setCheck_port(String check_port) {
        this.check_port = check_port;
    }

    public String getData_port() {
        return data_port;
    }

    public void setData_port(String data_port) {
        this.data_port = data_port;
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
