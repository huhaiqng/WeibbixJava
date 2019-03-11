package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.*;
import org.apache.ibatis.annotations.Param;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Map;

public interface InstanceMapper {
    public List<Map> getHostForCreateInstanceSQL(@Param("hostGroup")String hostGroup,
                                                  @Param("envType")String envType);
    public void saveTomcatInstanceSQL(TomcatInstance tomcatInstance);
    public Integer existInstanceCountSQL(TomcatInstance tomcatInstance);

    public List<TomcatInstance> selectTomcatInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectTomcatInstanceCountByEnvSQL(@Param("env") String env);

    public List<TomcatInstance> selectTomcatInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
            );
    public Integer selectTomcatInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env);

    //获取java实例
    public List<JavaInstance> selectJavaInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectJavaInstanceCountByEnvSQL(@Param("env") String env);
    public List<JavaInstance> selectJavaInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectJavaInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env);
    //删除tomcats实例
    public void deleteTomcatInstanceSQL(@Param("id") String id);
    //更新tomcat实例状态
    public void updateInstanceAllocatedSQL(
            @Param("allocated") Boolean allocated,
            @Param("instanceId") String instanceId,
            @Param("name") String name);
    //通过Id获取实例分配状态
    public Boolean getTomcatInstanceAllocatedByIdSQL(@Param("id")String id);
    //保存java实例
    void saveJavaInstanceSQL(JavaInstance javaInstance);
    //检查java实例是否存在
    Integer getJavaInstanceCountByIpNameSQL(@Param("ip")String ip,@Param("name")String name);

    //通过Id获取Java实例分配状态
    Boolean getJavaInstanceAllocatedByIdSQL(@Param("id")String id);
    //删除tomcats实例
    void deleteJavaInstanceSQL(@Param("id") String id);
//--------------------------------------------Zookeeper 实例--------------------------------------------
    //检查zookeeper实例是否已存在
    Integer getZookeeperInstanceCountByIpNameSQL(@Param("ip")String ip,@Param("name")String name);
    //保存zookeeper实例
    void saveZookeeperInstanceSQL(ZookeeperInstance zookeeperInstance);

    //获取Zookeeper实例
    public List<ZookeeperInstance> selectZookeeperInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectZookeeperInstanceCountByEnvSQL(@Param("env") String env);
    public List<ZookeeperInstance> selectZookeeperInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectZookeeperInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env);

    //通过Id获取Zookeeper实例分配状态
    Boolean getZookeeperInstanceAllocatedByIdSQL(@Param("id")String id);
    //删除tomcats实例
    void deleteZookeeperInstanceSQL(@Param("id") String id);
//--------------------------------------------kafka--------------------------------------------
    //检查kafka实例是否已存在
    Integer getKafkaInstanceCountByIpNameSQL(@Param("ip")String ip,@Param("name")String name);
    //保存zookeeper实例
    void saveKafkaInstanceSQL(KafkaInstance kafkaInstance);
    //获取Kafka实例
    public List<KafkaInstance> selectKafkaInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectKafkaInstanceCountByEnvSQL(@Param("env") String env);
    public List<KafkaInstance> selectKafkaInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectKafkaInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env);
    //通过Id获取Kafka实例分配状态
    Boolean getKafkaInstanceAllocatedByIdSQL(@Param("id")String id);
    //删除tomcats实例
    void deleteKafkaInstanceSQL(@Param("id") String id);
    //--------------------------------------------redis--------------------------------------------
    //检查redis实例是否已存在
    Integer getRedisInstanceCountByIpNameSQL(@Param("ip")String ip,@Param("name")String name);
    //保存zookeeper实例
    void saveRedisInstanceSQL(RedisInstance redisInstance);
    //获取Redis实例
    public List<RedisInstance> selectRedisInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectRedisInstanceCountByEnvSQL(@Param("env") String env);
    public List<RedisInstance> selectRedisInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectRedisInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env);
    //通过Id获取Redis实例分配状态
    Boolean getRedisInstanceAllocatedByIdSQL(@Param("id")String id);
    //删除tomcats实例
    void deleteRedisInstanceSQL(@Param("id") String id);

    //--------------------------------------------nginx--------------------------------------------
    //检查nginx实例是否已存在
    Integer getNginxInstanceCountByIpNameSQL(@Param("ip")String ip,@Param("name")String name);
    //保存zookeeper实例
    void saveNginxInstanceSQL(NginxInstance nginxInstance);
    //获取Nginx实例
    public List<NginxInstance> selectNginxInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectNginxInstanceCountByEnvSQL(@Param("env") String env);
    public List<NginxInstance> selectNginxInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectNginxInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env);
    //通过Id获取Nginx实例分配状态
    Boolean getNginxInstanceAllocatedByIdSQL(@Param("id")String id);
    //删除tomcats实例
    void deleteNginxInstanceSQL(@Param("id") String id);

    //--------------------------------------------mysql--------------------------------------------
    //检查mysql实例是否已存在
    Integer getMysqlInstanceCountByIpNameSQL(@Param("ip")String ip,@Param("name")String name);
    //保存zookeeper实例
    void saveMysqlInstanceSQL(MysqlInstance mysqlInstance);
    //获取Mysql实例
    public List<MysqlInstance> selectMysqlInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectMysqlInstanceCountByEnvSQL(@Param("env") String env);
    public List<MysqlInstance> selectMysqlInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count
    );
    public Integer selectMysqlInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env);
    //通过Id获取Mysql实例分配状态
    Boolean getMysqlInstanceAllocatedByIdSQL(@Param("id")String id);
    //删除tomcats实例
    void deleteMysqlInstanceSQL(@Param("id") String id);

}
