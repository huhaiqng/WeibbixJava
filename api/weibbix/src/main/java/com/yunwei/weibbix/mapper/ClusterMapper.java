package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.access.method.P;

import java.util.List;

public interface ClusterMapper {
    //----------------------------- kafka -----------------------------
//    public void insertKafkaClusterSQL(
//            @Param("clusterId")String clusterId,
//            @Param("clusterName") String clusterName,
//            @Param("clusterEnv") String clusterEnv);
//
//    public void insertClusterHostSQL(
//            @Param("hcId") String hcId,
//            @Param("hostId") String hostId,
//            @Param("clusterId") String clusterId
//    );
//
//    public List<KafkaCluster> selectAllKafkaCusterSQL();
//    public List<String> selectClusterMemberSQL(@Param("clusterId") String clusterId);
//    public List<String> getKafkaNoAllocatedHostSQL(@Param("clusterEnv") String clusterEnv);
//    public void addKafkaClusterHostSQL(@Param("hcId") String hcId,@Param("hostId") String hostId,@Param("clusterId") String clusterId);
//    public void delKafkaClusterHostSQL(@Param("hostId") String hostId,@Param("clusterId") String clusterId);

    //----------------------------- tomcat -----------------------------
    //获取未分配tomcat实例
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

    //----------------------------- nginx -----------------------------
    //获取未分配nginx实例
    public List<NginxInstance> getNotAllocatedNginxInstanceSQL(@Param("env") String env);

    //添加nginx集群
    public void addNginxClusterSQL(NginxCluster nginxCluster);
    //添加实例-集群
    public void addNginxInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateNginxInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                                 @Param("instanceId") String instanceId);

    //通过环境查询nginx集群名称
    public List<NginxCluster> getNginxClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Nginx集群数量
    public Integer getNginxClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Nginx集群
    public List<NginxCluster> getNginxClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Nginx集群数量
    public Integer getNginxClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<NginxInstance> getNginxInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteNginxClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getNginxClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Nginx集群
    public void deleteNginxClusterSQL(@Param("clusterId")String clusterId);

    //----------------------------- mysql -----------------------------
    //获取未分配mysql实例
    public List<MysqlInstance> getNotAllocatedMysqlInstanceSQL(@Param("env") String env);

    //添加mysql集群
    public void addMysqlClusterSQL(MysqlCluster mysqlCluster);
    //添加实例-集群
    public void addMysqlInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateMysqlInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                                @Param("instanceId") String instanceId);

    //通过环境查询mysql集群名称
    public List<MysqlCluster> getMysqlClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Mysql集群数量
    public Integer getMysqlClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Mysql集群
    public List<MysqlCluster> getMysqlClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Mysql集群数量
    public Integer getMysqlClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<MysqlInstance> getMysqlInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteMysqlClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getMysqlClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Mysql集群
    public void deleteMysqlClusterSQL(@Param("clusterId")String clusterId);

    //----------------------------- zookeeper -----------------------------
    //获取未分配zookeeper实例
    public List<ZookeeperInstance> getNotAllocatedZookeeperInstanceSQL(@Param("env") String env);

    //添加zookeeper集群
    public void addZookeeperClusterSQL(ZookeeperCluster zookeeperCluster);
    //添加实例-集群
    public void addZookeeperInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateZookeeperInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                                    @Param("instanceId") String instanceId);

    //通过环境查询zookeeper集群名称
    public List<ZookeeperCluster> getZookeeperClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Zookeeper集群数量
    public Integer getZookeeperClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Zookeeper集群
    public List<ZookeeperCluster> getZookeeperClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Zookeeper集群数量
    public Integer getZookeeperClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<ZookeeperInstance> getZookeeperInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteZookeeperClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getZookeeperClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Zookeeper集群
    public void deleteZookeeperClusterSQL(@Param("clusterId")String clusterId);

    //----------------------------- kafka -----------------------------
    //获取未分配kafka实例
    public List<KafkaInstance> getNotAllocatedKafkaInstanceSQL(@Param("env") String env);

    //添加kafka集群
    public void addKafkaClusterSQL(KafkaCluster kafkaCluster);
    //添加实例-集群
    public void addKafkaInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateKafkaInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                                @Param("instanceId") String instanceId);

    //通过环境查询kafka集群名称
    public List<KafkaCluster> getKafkaClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Kafka集群数量
    public Integer getKafkaClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Kafka集群
    public List<KafkaCluster> getKafkaClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Kafka集群数量
    public Integer getKafkaClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<KafkaInstance> getKafkaInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteKafkaClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getKafkaClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Kafka集群
    public void deleteKafkaClusterSQL(@Param("clusterId")String clusterId);

    //----------------------------- mongodb -----------------------------
    //获取未分配mongodb实例
    public List<MongodbInstance> getNotAllocatedMongodbInstanceSQL(@Param("env") String env);

    //添加mongodb集群
    public void addMongodbClusterSQL(MongodbCluster mongodbCluster);
    //添加实例-集群
    public void addMongodbInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateMongodbInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                                  @Param("instanceId") String instanceId);

    //通过环境查询mongodb集群名称
    public List<MongodbCluster> getMongodbClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Mongodb集群数量
    public Integer getMongodbClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Mongodb集群
    public List<MongodbCluster> getMongodbClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Mongodb集群数量
    public Integer getMongodbClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<MongodbInstance> getMongodbInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteMongodbClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getMongodbClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Mongodb集群
    public void deleteMongodbClusterSQL(@Param("clusterId")String clusterId);

    //----------------------------- redis -----------------------------
    //获取未分配redis实例
    public List<RedisInstance> getNotAllocatedRedisInstanceSQL(@Param("env") String env);

    //添加redis集群
    public void addRedisClusterSQL(RedisCluster redisCluster);
    //添加实例-集群
    public void addRedisInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateRedisInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                                @Param("instanceId") String instanceId);

    //通过环境查询redis集群名称
    public List<RedisCluster> getRedisClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Redis集群数量
    public Integer getRedisClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Redis集群
    public List<RedisCluster> getRedisClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Redis集群数量
    public Integer getRedisClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<RedisInstance> getRedisInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteRedisClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getRedisClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Redis集群
    public void deleteRedisClusterSQL(@Param("clusterId")String clusterId);

    //----------------------------- rabbitmq -----------------------------
    //获取未分配rabbitmq实例
    public List<RabbitmqInstance> getNotAllocatedRabbitmqInstanceSQL(@Param("env") String env);

    //添加rabbitmq集群
    public void addRabbitmqClusterSQL(RabbitmqCluster rabbitmqCluster);
    //添加实例-集群
    public void addRabbitmqInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateRabbitmqInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                                   @Param("instanceId") String instanceId);

    //通过环境查询rabbitmq集群名称
    public List<RabbitmqCluster> getRabbitmqClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Rabbitmq集群数量
    public Integer getRabbitmqClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Rabbitmq集群
    public List<RabbitmqCluster> getRabbitmqClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Rabbitmq集群数量
    public Integer getRabbitmqClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<RabbitmqInstance> getRabbitmqInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteRabbitmqClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getRabbitmqClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Rabbitmq集群
    public void deleteRabbitmqClusterSQL(@Param("clusterId")String clusterId);

    //----------------------------- java -----------------------------
    //获取未分配java实例
    public List<JavaInstance> getNotAllocatedJavaInstanceSQL(@Param("env") String env);

    //添加java集群
    public void addJavaClusterSQL(JavaCluster javaCluster);
    //添加实例-集群
    public void addJavaInstanceClusterSQL(
            @Param("id") String id,
            @Param("instanceId")String instanceId,
            @Param("clusterId") String clusterId);
    //将实例改为已分配
    public void updateJavaInstanceAllocatedSQL(@Param("allocated") Boolean allocated,
                                               @Param("instanceId") String instanceId);

    //通过环境查询java集群名称
    public List<JavaCluster> getJavaClusterSQL(
            @Param("env")String env,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count);
    //通过环境查询Java集群数量
    public Integer getJavaClusterCoutSQL(@Param("env")String env);
    //通过环境集群名称查询Java集群
    public List<JavaCluster> getJavaClusterByNameSQL(
            @Param("env")String env,
            @Param("name")String name,
            @Param("beforeNum")Integer beforeNum,
            @Param("count")Integer count
    );
    //通过环境集群名查询Java集群数量
    public Integer getJavaClusterCoutByNameSQL(@Param("env")String env,@Param("name")String name);
    //通过集群id获取该集群说有的实例
    public List<JavaInstance> getJavaInstancesByClusterIdSQL(@Param("clusterId")String clusterId);

    //删除集群的实例
    public void deleteJavaClusterInstanceSQL(@Param("instanceId")String instanceId);
    //获取集群实例数量
    public Integer getJavaClusterInstanceCountSQL(@Param("clusterId")String clusterId);
    //删除Java集群
    public void deleteJavaClusterSQL(@Param("clusterId")String clusterId);

}
