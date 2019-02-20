package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.Software;

import java.util.List;

public interface SoftwareMapper {

    //获取软件名称
    List<String> getSoftwareNameSQL();
}
