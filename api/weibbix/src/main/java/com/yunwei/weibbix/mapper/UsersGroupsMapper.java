package com.yunwei.weibbix.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.security.access.method.P;

import java.math.BigInteger;

public interface UsersGroupsMapper {
    public void insertUserGroupsSQL(@Param("userId")BigInteger userId, @Param("groupId") BigInteger groupId);
}
