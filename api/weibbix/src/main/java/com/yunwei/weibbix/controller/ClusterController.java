package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.*;
import com.yunwei.weibbix.mapper.ClusterMapper;
import com.yunwei.weibbix.mapper.HostMapper;
import com.yunwei.weibbix.mapper.InstanceMapper;
import com.yunwei.weibbix.service.ShellCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ClusterController {
    @Autowired(required = false)
    private ClusterMapper clusterMapper;

    @Autowired(required = false)
    private HostMapper hostMapper;

    @Autowired(required = false)
    private ShellCommandService shellCommandService;

    @Autowired(required = false)
    private InstanceMapper instanceMapper;

    @PostMapping("/api/add/kafkaCluster")
    public void insertKafkaCluster(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId").toString();
        String clusterName = (String)objectMap.get("clusterName");
        String clusterEnv = (String)objectMap.get("clusterEnv");

        clusterMapper.insertKafkaClusterSQL(clusterId,clusterName,clusterEnv);
    }

    @PostMapping("/api/add/hostCluster")
    public void insertClusterHost(@RequestBody Map<String,Object> objectMap){
        String hcId =(String)objectMap.get("hcId").toString();
        String hostId = (String)objectMap.get("hostId").toString();
        String clusterId = (String)objectMap.get("clusterId").toString();

        clusterMapper.insertClusterHostSQL(hcId,hostId,clusterId);
        hostMapper.updateHostAllocatedSQL(hostId,true);
    }

    @GetMapping("/api/get/kafkaCluster")
    public List<KafkaCluster> getKafkaCluster() throws Exception{
        return clusterMapper.selectAllKafkaCusterSQL();
    }

    @PostMapping("/api/get/clusterMember")
    public List<String> getClusterMember(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.selectClusterMemberSQL(clusterId);
    }

    @PostMapping("/api/delete/kafkaCluster")
    public void deleteKafkaCluster(@RequestBody Map<String,Object> objectMap){

    }

    @PostMapping("/api/shellCommand/createCluster")
    public void execShellCommandCreateCluster(@RequestBody Map<String,Object> objectMap){
        String topic_uri = (String)objectMap.get("topic_uri");
        System.out.println(topic_uri);
        shellCommandService.installZabbixAgetnd(topic_uri);
    }

    @PostMapping("/api/getKafkaNoAllocatedHost")
    public List<String> getKafkaNoAllocatedHost(@RequestBody Map<String,Object> objectMap){
        String clusterEnv = (String)objectMap.get("clusterEnv");
        return clusterMapper.getKafkaNoAllocatedHostSQL(clusterEnv);
    }

    @PostMapping("/api/add/kafkaClusterHost")
    public void addKafkaClusterHost(@RequestBody Map<String,Object> objectMap){
        String hcId =(String)objectMap.get("hcId").toString();
        String clusterId = (String)objectMap.get("clusterId");
        String ip = (String)objectMap.get("ip");
        String hostId = hostMapper.selectHostIdByIpSQL(ip);
        clusterMapper.addKafkaClusterHostSQL(hcId,hostId,clusterId);
        hostMapper.updateHostAllocatedSQL(hostId,true);
    }

    @PostMapping("/api/del/kafkaClusterHost")
    public void delKafkaClusterHost(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        String ip = (String)objectMap.get("ip");
        String hostId = hostMapper.selectHostIdByIpSQL(ip);
        System.out.println(hostId);
        System.out.println(clusterId);
        clusterMapper.delKafkaClusterHostSQL(hostId,clusterId);
        hostMapper.updateHostAllocatedSQL(hostId,false);
    }

    //获取未分配tomcat实例
    @PostMapping("/api/getNotAllocatedTomcatInstance")
    public List<TomcatInstance> getNotAllocatedTomcatInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedTomcatInstanceSQL(env);
    }

    //保存tomcat集群
    @PostMapping("/api/addTomcatCluster")
    public void addTomcatCluster(@RequestBody TomcatCluster tomcatCluster){
        clusterMapper.addTomcatClusterSQL(tomcatCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addInstanceCluster")
    public void addInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        String name = (String)objectMap.get("name");
        clusterMapper.addInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        instanceMapper.updateInstanceAllocatedSQL(allocated,instanceId,name);
    }
    //获取tomcat集群
    @PostMapping("/api/getTomcatCluster")
    public PagesListResponse getTomcatCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getTomcatClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getTomcatClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getTomcatClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getTomcatClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getTomcatInstancesByClusterId")
    public List<TomcatInstance> getTomcatInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getTomcatInstancesByClusterIdSQL(clusterId);
    }
    //删除tomcat集群实例
    @PostMapping("/api/deleteTomcatClusterInstance")
    public void deleteTomcatClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteTomcatClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        instanceMapper.updateInstanceAllocatedSQL(allocated,instanceId,name);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getTomcatClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteTomcatClusterSQL(clusterId);
        }
    }
}
