package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.UsersGroup;
import org.apache.ibatis.annotations.Param;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;

public interface UsersGroupMapper {
    public UsersGroup selectOneGroup(@Param("groupName") String groupName);
    public void insertGroup(@Param("groupName") String groupName,@Param("enabled") Boolean enabled);
    public List<UsersGroup> selectGroupsSQL(@Param("beforeNum") Integer beforeNum,@Param("groupsCount") Integer groupCount);
    public Integer selectGroupsCountSQL();
    public void deleteGroupSQL(@Param("groupId") BigInteger groupId);
    public void changeGroupStatusSQL(@Param("enabled") Boolean enabled,@Param("groupId") BigInteger groupId);
    public void updateGroupSQL(UsersGroup usersGroup);
    public List<UsersGroup> selectEnabledGroupsSQL();
    public List<String> selectUserGroupsSQL(@Param("userId") BigInteger userId);
    public List<UsersGroup> selectSearchGroupsSQL(@Param("beforeNum") Integer beforeNum,@Param("groupsCount") Integer groupCount,@Param("groupName") String groupName);
    public Integer selectSearchGroupsCountSQL(@Param("groupName") String groupName);
    Integer getExistGroupUsersCountSQL(@Param("groupId")BigInteger groupId);
}
