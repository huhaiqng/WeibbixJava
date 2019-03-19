package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectMapper {
    //保存项目
    public void saveTreeAppSQL(TreeApp treeApp);
    //查询项目
    public List<TreeApp> getTreeAppByEnvSQL(@Param("env")String env);

    //查询tomcat集群
    public List<TomcatCluster> getTomcatClusterByEnvSQL(@Param("env")String env);

    //查询nginx集群
    public List<NginxCluster> getNginxClusterByEnvSQL(@Param("env")String env);

    //保存模块
    void saveTreeModelSQL(TreeModel treeModel);
    List<TreeModel> getTreeModelByAppIdSQL(@Param("appId")String appId);
    //通过ID查询tomcat集群
    TomcatCluster getTomcatClusterByClusterIdSQL(@Param("clusterId")String clusterId);
    //通过ID查询tomcat实例
    List<TomcatInstance> getTomcatInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

    //获取项目模块实例数量
    Integer getTreeModelCountSQL(@Param("id")String id);
    //获取项目名称
    String getTreeAppTextSQL(@Param("id")String id);
    //删除项目
    void deleteTreeAppSQL(@Param("text")String text);


    //删除模块
    void deleteTreeModelSQL(@Param("id")String id);
    //查询项目数量
    Integer getTomcatTreeAppCountSQL(@Param("text")String text);

    //查看模块是否已存在
    Integer getExistModelCountSQL(@Param("text")String text,@Param("appId")String appId);

    //更新tomcat实例所属项目
    void updataTomcatInstanceProjectSQL(@Param("appId")String appId,@Param("clusterId")String clusterId);
    //更新nginx实例所属项目
    void updataNginxInstanceProjectSQL(@Param("appId")String appId,@Param("clusterId")String clusterId,@Param("app_text")String app_text);

    //删除tomcat实例项目名称
    void deleteTomcatInstanceProjectSQL(@Param("id")String id);
    //删除nginx实例项目名称
    void deleteNginxInstanceProjectSQL(@Param("id")String id,@Param("app_text")String app_text);

    //通过id获取模块类型
    String getModelTextByIdSQL(@Param("id")String id);
    //获取项目名称
    String getAppTextSQL(@Param("id")String id);

    // ----------------------------------- nginx -----------------------------------
    //通过集群ID查询nginx集群
    NginxCluster getNginxClusterByClusterIdSQL(@Param("clusterId")String clusterId);
    //通过集群ID查询nginx实例
    List<NginxInstance> getNginxInstanceByClusterIdSQL(@Param("clusterId")String clusterId);
    //通过APP ID获取项目名称
    String getAppTextByAppIdSQL(@Param("appId")String appId);

    // ----------------------------------- mysql -----------------------------------
    //查询mysql集群
    public List<MysqlCluster> getMysqlClusterByEnvSQL(@Param("env")String env);
    //更新mysql实例所属项目
    void updataMysqlInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
    //通过集群ID查询mysql实例
    List<MysqlInstance> getMysqlInstanceByClusterIdSQL(@Param("clusterId")String clusterId);
    //通过模块ID获取集群ID
    String  getClusterIdByModelIdSQL(@Param("id")String id);

    // ----------------------------------- zookeeper -----------------------------------
    //查询zookeeper集群
    public List<ZookeeperCluster> getZookeeperClusterByEnvSQL(@Param("env")String env);
    //更新zookeeper实例所属项目
    void updataZookeeperInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
    //通过集群ID查询zookeeper实例
    List<ZookeeperInstance> getZookeeperInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

    // ----------------------------------- kafka -----------------------------------
    //查询kafka集群
    public List<KafkaCluster> getKafkaClusterByEnvSQL(@Param("env")String env);
    //更新kafka实例所属项目
    void updataKafkaInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
    //通过集群ID查询kafka实例
    List<KafkaInstance> getKafkaInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

    // ----------------------------------- mongodb -----------------------------------
    //查询mongodb集群
    public List<MongodbCluster> getMongodbClusterByEnvSQL(@Param("env")String env);
    //更新mongodb实例所属项目
    void updataMongodbInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
    //通过集群ID查询mongodb实例
    List<MongodbInstance> getMongodbInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

    // ----------------------------------- redis -----------------------------------
    //查询redis集群
    public List<RedisCluster> getRedisClusterByEnvSQL(@Param("env")String env);
    //更新redis实例所属项目
    void updataRedisInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
    //通过集群ID查询redis实例
    List<RedisInstance> getRedisInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

    // ----------------------------------- rabbitmq -----------------------------------
    //查询rabbitmq集群
    public List<RabbitmqCluster> getRabbitmqClusterByEnvSQL(@Param("env")String env);
    //更新rabbitmq实例所属项目
    void updataRabbitmqInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
    //通过集群ID查询rabbitmq实例
    List<RabbitmqInstance> getRabbitmqInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

    // ----------------------------------- java -----------------------------------
    //查询java集群
    public List<JavaCluster> getJavaClusterByEnvSQL(@Param("env")String env);
    //更新java实例所属项目
    void updataJavaInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
    //通过集群ID查询java实例
    List<JavaInstance> getJavaInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

}
