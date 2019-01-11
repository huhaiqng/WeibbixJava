package com.yunwei.weibbix.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.security.access.method.P;

public interface ClusterMapper {
    public void insertKafkaClusterSQL(
            @Param("clusterId")String clusterId,
            @Param("clusterName") String clusterName,
            @Param("clusterEnv") String clusterEnv);

    public void insertClusterHostSQL(
            @Param("hcId") String hcId,
            @Param("hostId") String hostId,
            @Param("clusterId") String clusterId
    );
}
