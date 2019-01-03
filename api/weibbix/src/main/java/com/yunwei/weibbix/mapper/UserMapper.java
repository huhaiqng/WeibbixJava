package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.User;
import org.apache.ibatis.annotations.Param;

import java.math.BigInteger;
import java.util.List;

public interface UserMapper {
    public void insertUser(@Param("userName") String userName, @Param("password") String password, @Param("enabled") Boolean enabled);
    public User selectOneUser(@Param("userName") String userName);
    public List<User> selectUsersSQL(@Param("beforeNum") Integer currentPage,@Param("usersCount") Integer userCount);
    public void deleteUserSQL(User user);
    public void changeUserStatusSQL(User user);
    public List<String> selectGroupUsersSQL(Integer groupId);
    public void updateUserSQL(User user);
    public void updateUserPasswordSQL(User user);
    public Integer selectUsersCountSQL();
    public List<User> selectSearchUsersSQL(@Param("beforeNum") Integer currentPage,@Param("usersCount") Integer userCount,@Param("userNameLike") String userNameLike);
    public Integer selectSearchUsersCountSQL(@Param("userNameLike") String userNameLike);
}
