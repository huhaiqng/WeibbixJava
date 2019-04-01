package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.Account;
import com.yunwei.weibbix.entity.Instance;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AccountMapper {
    //获取账号类型
    List<String> getAccountTypeSQL();

    //保存账号
    void saveAccountSQL(Account account);

    //获取账号
    List<Account> selectAccountByTypeSQL(
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count,
            @Param("type")String type
    );
    Integer selectAccountCountByTypeSQL(@Param("type") String type);
    List<Account> selectAccountByTypeUserSQL(
            @Param("user") String user,
            @Param("beforeNum") Integer beforeNum,
            @Param("count") Integer count,
            @Param("type")String type
    );
    Integer selectAccountByTypeUserCountSQL(@Param("user") String user,@Param("type")String type);

    //删除账号
    void deleteAccountSQL(@Param("id")String id);
}
