package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.PagesListResponse;
import com.yunwei.weibbix.entity.TomcatInstance;
import com.yunwei.weibbix.mapper.HostMapper;
import com.yunwei.weibbix.mapper.InstanceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class InstanceController {
    @Autowired(required = false)
    private InstanceMapper instanceMapper;
    @Autowired(required = false)
    private HostMapper hostMapper;

    @PostMapping("/api/getHostForCreateInstance")
    public List<Map> getHostForCreateInstance(@RequestBody Map<String,Object> objectMap){
        String hostGroup = (String)objectMap.get("hostGroup");
        String envType = (String)objectMap.get("envType");
        return instanceMapper.getHostForCreateInstanceSQL(hostGroup,envType);
    }

    @PostMapping("/api/saveTomcatInstance")
    public void saveTomcatInstance(@RequestBody TomcatInstance tomcatInstance){
        Integer ins_count = instanceMapper.existInstanceCountSQL(tomcatInstance);
        if(ins_count == 0){
            instanceMapper.saveTomcatInstanceSQL(tomcatInstance);
            hostMapper.addHostInstanceNumSQL(tomcatInstance);
        }
    }

    @PostMapping("/api/getOnePageTomcatInstance")
    public PagesListResponse getAllTomcatInstance(@RequestBody Map<String,Object> objectMap){
        PagesListResponse pagesListResponse = new PagesListResponse();
        String ip = (String)objectMap.get("ip");
        String env= (String)objectMap.get("env");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        Integer beforeNum = (currentPage-1)*count;

        if(ip.equals("")){
            pagesListResponse.setPageList(instanceMapper.selectTomcatInstanceByEnvSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectTomcatInstanceCountByEnvSQL(env)/count));
        }else{
            pagesListResponse.setPageList(instanceMapper.selectTomcatInstanceByEnvIpSQL("%"+ip+"%",env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectTomcatInstanceByEnvIpCountSQL("%"+ip+"%",env)/count));
        }

        return pagesListResponse;
    }

    @PostMapping("/api/deleteTomcatInstance")
    public void deleteTomcatInstance(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String ip = (String)objectMap.get("ip");

        instanceMapper.deleteTomcatInstanceSQL(id);
        hostMapper.delHostInstanceNumSQL(ip);
    }
}
