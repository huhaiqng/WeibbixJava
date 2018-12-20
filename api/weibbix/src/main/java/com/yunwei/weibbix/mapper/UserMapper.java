package com.yunwei.weibbix.mapper;

import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    public void insertUser(@Param("userName") String userName, @Param("password") String password, @Param("enabled") Boolean enabled);
}
