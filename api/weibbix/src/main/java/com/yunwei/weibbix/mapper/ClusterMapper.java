package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.access.method.P;

import java.util.List;

public interface ClusterMapper {
    //获取未分配实例
    List<Instance> getNotAllocatedInstanceSQL(@Param("env") String env,@Param("type")String type);
    //添加集群
    void addClusterSQL(Cluster Cluster);
    //添加实例-集群
    void addInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配,设置实例名称
    void updateInstanceAllocatedSQL(
            @Param("allocated") Boolean allocated,
            @Param("instanceId") String instanceId,
            @Param("cluster")String cluster);

    //通过环境查询集群名称
    public List<Cluster> getClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count,
            @Param("type") String type);
    //通过环境查询集群数量
    public Integer getClusterCoutSQL(@Param("env")String env,
                                     @Param("type") String type);
    //通过环境集群名称查询集群
    public List<Cluster> getClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count,
            @Param("type") String type
    );
    //通过环境集群名查询集群数量
    public Integer getClusterCoutByNameSQL(@Param("env")String env,
                                           @Param("name")String name,
                                           @Param("type") String type);
    //通过集群id获取该集群说有的实例
    public List<Instance> getInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除集群
    public void deleteClusterSQL(@Param("clusterId")String clusterId);
}
