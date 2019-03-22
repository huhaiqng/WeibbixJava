package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.*;
import com.yunwei.weibbix.mapper.ClusterMapper;
import com.yunwei.weibbix.mapper.HostMapper;
import com.yunwei.weibbix.mapper.InstanceMapper;
import com.yunwei.weibbix.service.ShellCommandService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ClusterController {
    @Autowired(required = false)
    private ClusterMapper clusterMapper;

    //获取未分配实例
    @PostMapping("/api/getNotAllocatedInstance")
    public List<Instance> getNotAllocatedInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        String type = (String)objectMap.get("type");
        return clusterMapper.getNotAllocatedInstanceSQL(env,type);
    }
    //保存集群
    @PostMapping("/api/addCluster")
    public void addCluster(@RequestBody Cluster Cluster){
        clusterMapper.addClusterSQL(Cluster);
    }
    //保存实例-集群
    @PostMapping("/api/addInstanceCluster")
    public void addInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        String cluster = (String)objectMap.get("name");
        clusterMapper.addInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateInstanceAllocatedSQL(allocated,instanceId,cluster);
    }

    //获取集群
    @PostMapping("/api/getCluster")
    public PagesListResponse getCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        String type = (String)objectMap.get("type");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getClusterSQL(env,beforeNum,count,type));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getClusterCoutSQL(env,type)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getClusterByNameSQL(env,"%"+name+"%",beforeNum,count,type));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getClusterCoutByNameSQL(env,"%"+name+"%",type)/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getInstancesByClusterId")
    public List<Instance> getInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getInstancesByClusterIdSQL(clusterId);
    }

    //删除集群实例
    @PostMapping("/api/deleteClusterInstance")
    public void deleteClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String cluster = "";
        clusterMapper.updateInstanceAllocatedSQL(allocated,instanceId,cluster);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteClusterSQL(clusterId);
        }
    }


}
