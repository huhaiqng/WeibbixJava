package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.TomcatInstance;
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
    public void deleteTomcatInstanceSQL(@Param("id") String id);
}
