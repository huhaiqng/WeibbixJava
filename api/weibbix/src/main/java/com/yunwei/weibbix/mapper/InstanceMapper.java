package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.TomcatInstance;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface InstanceMapper {
    public List<Map> getHostForCreateInstanceSQL(@Param("hostGroup")String hostGroup,
                                                  @Param("envType")String envType);
    public void saveTomcatInstanceSQL(TomcatInstance tomcatInstance);
    public Integer existInstanceCountSQL(TomcatInstance tomcatInstance);
}
