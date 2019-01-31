package com.yunwei.weibbix.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface InstanceMapper {
    public List<Map> getHostForCreateInstanceSQL(@Param("hostGroup")String hostGroup,
                                                  @Param("envType")String envType);
}
