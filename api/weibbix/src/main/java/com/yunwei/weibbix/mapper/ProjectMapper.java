package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.TomcatCluster;
import com.yunwei.weibbix.entity.TomcatInstance;
import com.yunwei.weibbix.entity.TreeApp;
import com.yunwei.weibbix.entity.TreeModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectMapper {
    //保存项目
    public void saveTreeAppSQL(TreeApp treeApp);
    //查询项目
    public List<TreeApp> getTreeAppByEnvSQL(@Param("env")String env);
    //查询集群
    public List<TomcatCluster> getTomcatClusterByEnvSQL(@Param("env")String env);
    //保存模块
    void saveTreeModelSQL(TreeModel treeModel);
    List<TreeModel> getTreeModelByAppIdSQL(@Param("appId")String appId);
    //通过ID查询tomcat集群
    TomcatCluster getTomcatClusterByClusterIdSQL(@Param("clusterId")String clusterId);
    //通过ID查询tomcat实例
    List<TomcatInstance> getTomcatInstanceByClusterIdSQL(@Param("clusterId")String clusterId);
    //获取项目模块实例
    Integer getTomcatTreeModelCountSQL(@Param("id")String id);
    //删除项目
    void deleteTomcatTreeAppSQL(@Param("id")String id);
    //删除模块
    void deleteTomcatTreeModelSQL(@Param("id")String id);
    //查询项目数量
    Integer getTomcatTreeAppCountSQL(@Param("text")String text,@Param("env")String env);
}
