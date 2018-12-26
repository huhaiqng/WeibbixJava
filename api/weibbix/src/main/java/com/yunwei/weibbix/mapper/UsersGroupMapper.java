package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.UsersGroup;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

public interface UsersGroupMapper {
    public UsersGroup selectOneGroup(@Param("groupName") String groupName);
    public void insertGroup(@Param("groupName") String groupName,@Param("enabled") Boolean enabled);
//    public Set<UsersGroup> selectGroupsSQL();
    public List<UsersGroup> selectGroupsSQL();
}
