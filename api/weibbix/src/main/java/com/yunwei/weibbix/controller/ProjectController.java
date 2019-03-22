package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.*;
import com.yunwei.weibbix.mapper.ClusterMapper;
import com.yunwei.weibbix.mapper.ProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ProjectController {

    @Autowired(required = false)
    private ProjectMapper projectMapper;

    //保存项目
    @PostMapping("/api/saveTreeApp")
    public String saveTreeApp(@RequestBody TreeApp treeApp){
        String id = treeApp.getId();
        String text = treeApp.getText();

        Integer appCount = projectMapper.getTomcatTreeAppCountSQL(text);
        if(appCount.equals(0)){
            treeApp.setId("app_"+id+"_pro");
            treeApp.setEnv("pro");
            projectMapper.saveTreeAppSQL(treeApp);

            treeApp.setId("app_"+id+"_test");
            treeApp.setEnv("test");
            projectMapper.saveTreeAppSQL(treeApp);

            treeApp.setId("app_"+id+"_dev");
            treeApp.setEnv("dev");
            projectMapper.saveTreeAppSQL(treeApp);

            return "success";
        }else {
            return "项目名已存在！";
        }
    }

    //保存模块
    @PostMapping("/api/saveTreeModel")
    public String saveTreeModel(@RequestBody TreeModel treeModel){
        String text = treeModel.getText();
        String appId = treeModel.getAppId();
        String clusterId = treeModel.getClusterId();

        Integer existModelCount = projectMapper.getExistModelCountSQL(text,appId);
        if(existModelCount.equals(0)){
            projectMapper.saveTreeModelSQL(treeModel);
            //通过APP ID获取项目名称
            String app_text = projectMapper.getAppTextByAppIdSQL(appId);
            //更新实例所属项目
            projectMapper.updataInstanceProjectSQL(clusterId,app_text);
            return "success";
        }else {
            return "该项目已经存在该模块！";
        }
    }

    //查询项目
    @PostMapping("/api/getTreeAppByEnv")
    public List<TreeApp> getTreeAppByEnv(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        List<TreeApp> treeAppList =  projectMapper.getTreeAppByEnvSQL(env);
        for (TreeApp treeApp:treeAppList){
            String appId = treeApp.getId();
            treeApp.setChildren(projectMapper.getTreeModelByAppIdSQL(appId));
        }
        return treeAppList;
    }

    //删除项目
    @PostMapping("/api/deleteTreeApp")
    public String deleteTreeApp(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        //查询项目的模块
        Integer modelCount = projectMapper.getTreeModelCountSQL(id);
        if(modelCount.equals(0)){
            String text = projectMapper.getTreeAppTextSQL(id);
            projectMapper.deleteTreeAppSQL(text);
            return "success";
        }else {
            return "还存在模块，不能删除！";
        }
    }

    //删除模块
    @PostMapping("/api/deleteTreeModel")
    public void deleteTreeModel(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String app_text = "";
        //通过模块ID获取集群ID
        String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
        projectMapper.updataInstanceProjectSQL(clusertId,app_text);
        //删除模块
        projectMapper.deleteTreeModelSQL(id);
    }

    //通类型和环境获取集群
    @PostMapping("/api/getClusterByTypeEnv")
    public List<Cluster> getClusterByTypeEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        String type = (String)objectMap.get("type");
        return projectMapper.getClusterByTypeEnvSQL(env,type);
    }

    //通过集群ID获取实例
    @PostMapping("/api/getInstanceByClusterId")
    public List<Instance> getInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getInstanceByClusterIdSQL(clusterId);
    }
}
