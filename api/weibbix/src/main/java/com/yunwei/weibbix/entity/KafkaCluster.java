package com.yunwei.weibbix.entity;

public class KafkaCluster {
    private String clusterId;
    private String clusterName;
    private String clusterEnv;

    public String getClusterId() {
        return clusterId;
    }

    public void setClusterId(String clusterId) {
        this.clusterId = clusterId;
    }

    public String getClusterName() {
        return clusterName;
    }

    public void setClusterName(String clusterName) {
        this.clusterName = clusterName;
    }

    public String getClusterEnv() {
        return clusterEnv;
    }

    public void setClusterEnv(String clusterEnv) {
        this.clusterEnv = clusterEnv;
    }
}
