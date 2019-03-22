package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.*;
import com.yunwei.weibbix.mapper.HostMapper;
import com.yunwei.weibbix.mapper.InstanceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Map;

@RestController
public class InstanceController {
    @Autowired(required = false)
    private InstanceMapper instanceMapper;
    @Autowired(required = false)
    private HostMapper hostMapper;

    //获取创建实例的主机
    @PostMapping("/api/getHostForCreateInstance")
    public List<Map> getHostForCreateInstance(@RequestBody Map<String,Object> objectMap){
        String hostGroup = (String)objectMap.get("hostGroup");
        String envType = (String)objectMap.get("envType");
        return instanceMapper.getHostForCreateInstanceSQL(hostGroup,envType);
    }

    //保存实例
    @PostMapping("/api/saveInstance")
    public String saveInstance(@RequestBody Instance instance){
        String ip = instance.getIp();
        String name = instance.getName();
//        判断是否存在IP和名称相同的实例
        Integer count = instanceMapper.getInstanceCountByIpNameSQL(ip,name);
        if(count.equals(0)){
            instanceMapper.saveInstanceSQL(instance);
            hostMapper.addHostInstanceNumSQL(ip);
            return "success";
        }else {
            return "创建失败,实例已存在！";
        }
    }

    //获取实例
    @PostMapping("/api/getOnePageInstance")
    public PagesListResponse getOnePageInstance(@RequestBody Map<String,Object> objectMap){
        PagesListResponse pagesListResponse = new PagesListResponse();
        String ip = (String)objectMap.get("ip");
        String env = (String)objectMap.get("env");
        String type= (String)objectMap.get("type");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        Integer beforeNum = (currentPage-1)*count;

        if(ip.equals("")){
            pagesListResponse.setPageList(instanceMapper.selectInstanceByEnvSQL(env,beforeNum,count,type));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectInstanceCountByEnvSQL(env,type)/count));
        }else{
            pagesListResponse.setPageList(instanceMapper.selectInstanceByEnvIpSQL("%"+ip+"%",env,beforeNum,count,type));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectInstanceByEnvIpCountSQL("%"+ip+"%",env,type)/count));
        }

        return pagesListResponse;
    }

    //删除Rabbitmq实例
    @PostMapping("/api/deleteInstance")
    public String deleteInstance(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String ip = (String)objectMap.get("ip");
//        判断实例是否已分配
        Boolean allocated = instanceMapper.getInstanceAllocatedByIdSQL(id);
        if(allocated){
            return "该实例已经分配不能删除！";
        }else {
            instanceMapper.deleteInstanceSQL(id);
            hostMapper.delHostInstanceNumSQL(ip);
            return "success";
        }
    }
}

