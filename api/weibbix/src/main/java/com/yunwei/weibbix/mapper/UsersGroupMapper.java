package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.UsersGroup;
import org.apache.ibatis.annotations.Param;

public interface UsersGroupMapper {
    public UsersGroup selectOneGroup(@Param("groupName") String groupName);
    public void insertGroup(@Param("groupName") String groupName,@Param("enabled") Boolean enabled);
}
