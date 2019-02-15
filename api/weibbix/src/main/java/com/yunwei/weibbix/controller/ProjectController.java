package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.TreeApp;
import com.yunwei.weibbix.mapper.ProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void saveTreeApp(@RequestBody TreeApp treeApp){
        projectMapper.saveTreeAppSQL(treeApp);
    }
    //查询项目
    @PostMapping("/api/getTreeAppByEnv")
    public List<TreeApp> getTreeAppByEnv(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getTreeAppByEnvSQL(env);
    }
}
