package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.TreeApp;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectMapper {
    //保存项目
    public void saveTreeAppSQL(TreeApp treeApp);
    //查询项目
    public List<TreeApp> getTreeAppByEnvSQL(@Param("env") String env);
}
