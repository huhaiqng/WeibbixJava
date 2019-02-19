package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.TomcatCluster;
import com.yunwei.weibbix.entity.TomcatInstance;
import com.yunwei.weibbix.entity.TreeApp;
import com.yunwei.weibbix.entity.TreeModel;
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

    //查询集群
    @PostMapping("/api/getCluster/tomcat")
    public List<TomcatCluster> getTomcatClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getTomcatClusterByEnvSQL(env);
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
            //更新实例所属项目
            projectMapper.updataTomcatInstanceProjectSQL(appId,clusterId);
            return "success";
        }else {
            return "该项目已经存在改模块！";
        }
    }

    //通过ID查询tomcat集群
    @PostMapping("/api/getTomcatClusterByClusterId")
    public TomcatCluster getTomcatClusterByClusterId(@RequestBody Map<String,Object>objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getTomcatClusterByClusterIdSQL(clusterId);
    }

    //通过ID获取tomcat实例
    @PostMapping("/api/getTomcatInstanceByClusterId")
    public List<TomcatInstance> getTomcatInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getTomcatInstanceByClusterIdSQL(clusterId);
    }
    //删除项目
    @PostMapping("/api/deleteTomcatTreeApp")
    public String deleteTomcatTreeApp(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        //查询项目的模块
        Integer modelCount = projectMapper.getTomcatTreeModelCountSQL(id);
        if(modelCount.equals(0)){
            String text = projectMapper.getTomcatTreeAppTextSQL(id);
            projectMapper.deleteTomcatTreeAppSQL(text);
            return "success";
        }else {
            return "还存在模块，不能删除！";
        }
    }
    //删除模块
    @PostMapping("/api/deleteTomcatTreeModel")
    public void deleteTomcatTreeModel(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        //删除实例项目名称
        projectMapper.deleteTomcatInstanceProjectSQL(id);
        projectMapper.deleteTomcatTreeModelSQL(id);

    }
}
