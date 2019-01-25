package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.KafkaCluster;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.access.method.P;

import java.util.List;

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

    public List<KafkaCluster> selectAllKafkaCusterSQL();
    public List<String> selectClusterMemberSQL(@Param("clusterId") String clusterId);
    public List<String> getKafkaNoAllocatedHostSQL(@Param("clusterEnv") String clusterEnv);
    public void addKafkaClusterHostSQL(@Param("hcId") String hcId,@Param("hostId") String hostId,@Param("clusterId") String clusterId);
    public void delKafkaClusterHostSQL(@Param("clusterId") String clusterId,@Param("hostId") String hostId);
}
