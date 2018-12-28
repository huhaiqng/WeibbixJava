package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    public void insertUser(@Param("userName") String userName, @Param("password") String password, @Param("enabled") Boolean enabled);
    public User selectOneUser(@Param("userName") String userName);
    public List<User> selectUsersSQL();
    public void deleteUserSQL(User user);
    public void changeUserStatusSQL(User user);
}
