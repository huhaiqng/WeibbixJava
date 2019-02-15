package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.KafkaCluster;
import com.yunwei.weibbix.entity.TomcatCluster;
import com.yunwei.weibbix.entity.TomcatInstance;
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
    public void delKafkaClusterHostSQL(@Param("hostId") String hostId,@Param("clusterId") String clusterId);
    public List<TomcatInstance> getNotAllocatedTomcatInstanceSQL(@Param("env") String env);

    //添加tomcat集群
    public void addTomcatClusterSQL(TomcatCluster tomcatCluster);
    //添加实例-集群
    public void addInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //通过环境查询tomcat集群名称
    public List<TomcatCluster> getTomcatClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Tomcat集群数量
    public Integer getTomcatClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Tomcat集群
    public List<TomcatCluster> getTomcatClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Tomcat集群数量
    public Integer getTomcatClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<TomcatInstance> getTomcatInstancesByClusterIdSQL(@Param("clusterId")String clusterId);
    //删除集群的实例
    public void deleteTomcatClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getTomcatClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Tomcat集群
    public void deleteTomcatClusterSQL(@Param("clusterId")String clusterId);
}
