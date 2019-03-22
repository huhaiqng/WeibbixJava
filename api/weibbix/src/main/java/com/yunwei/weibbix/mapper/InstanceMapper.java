package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.*;
import org.apache.ibatis.annotations.Param;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Map;

public interface InstanceMapper {

    //获取创建实例的主机
    public List<Map> getHostForCreateInstanceSQL(@Param("hostGroup")String hostGroup,
                                                 @Param("envType")String envType);
    //检查实例是否已存在
    Integer getInstanceCountByIpNameSQL(@Param("ip")String ip,@Param("name")String name);
    //保存实例
    void saveInstanceSQL(Instance instance);
    //获取实例
    public List<Instance> selectInstanceByEnvSQL(
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count,
            @Param("type")String type
    );
    public Integer selectInstanceCountByEnvSQL(@Param("env") String env,@Param("type") String type);
    public List<Instance> selectInstanceByEnvIpSQL(
            @Param("ip") String ip,
            @Param("env") String env,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count,
            @Param("type")String type
    );
    public Integer selectInstanceByEnvIpCountSQL(@Param("ip") String ip,@Param("env") String env,@Param("type")String type);
    //通过Id获取实例分配状态
    Boolean getInstanceAllocatedByIdSQL(@Param("id")String id);
    //删除tomcats实例
    void deleteInstanceSQL(@Param("id") String id);
}
