package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectMapper {
    //保存项目
    public void saveTreeAppSQL(TreeApp treeApp);
    //查询项目
    public List<TreeApp> getTreeAppByEnvSQL(@Param("env")String env);

    //查询tomcat集群
    public List<TomcatCluster> getTomcatClusterByEnvSQL(@Param("env")String env);

    //查询nginx集群
    public List<NginxCluster> getNginxClusterByEnvSQL(@Param("env")String env);

    //保存模块
    void saveTreeModelSQL(TreeModel treeModel);
    List<TreeModel> getTreeModelByAppIdSQL(@Param("appId")String appId);
    //通过ID查询tomcat集群
    TomcatCluster getTomcatClusterByClusterIdSQL(@Param("clusterId")String clusterId);
    //通过ID查询tomcat实例
    List<TomcatInstance> getTomcatInstanceByClusterIdSQL(@Param("clusterId")String clusterId);

    //获取项目模块实例数量
    Integer getTreeModelCountSQL(@Param("id")String id);
    //获取项目名称
    String getTreeAppTextSQL(@Param("id")String id);
    //删除项目
    void deleteTreeAppSQL(@Param("text")String text);


    //删除模块
    void deleteTreeModelSQL(@Param("id")String id);
    //查询项目数量
    Integer getTomcatTreeAppCountSQL(@Param("text")String text);

    //查看模块是否已存在
    Integer getExistModelCountSQL(@Param("text")String text,@Param("appId")String appId);

   //通过APP ID获取项目名称
    String getAppTextByAppIdSQL(@Param("appId")String appId);

    //通过模块ID获取集群ID
    String  getClusterIdByModelIdSQL(@Param("id")String id);


    //    通类型和环境获取集群
    List<Cluster> getClusterByTypeEnvSQL(@Param("env")String env,@Param("type")String type);
    //通过集群ID查询实例
    List<Instance> getInstanceByClusterIdSQL(@Param("clusterId")String clusterId);
    //更新java实例所属项目
    void updataInstanceProjectSQL(
            @Param("clusterId")String clusterId,
            @Param("app_text")String app_text);
}
