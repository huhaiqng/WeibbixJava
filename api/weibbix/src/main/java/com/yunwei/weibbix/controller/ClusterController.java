package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.Host;
import com.yunwei.weibbix.entity.KafkaCluster;
import com.yunwei.weibbix.mapper.ClusterMapper;
import com.yunwei.weibbix.mapper.HostMapper;
import com.yunwei.weibbix.service.ShellCommandService;
import org.springframework.beans.factory.annotation.Autowired;
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
        hostMapper.updateHostAllocatedSQL(hostId);
    }

    @GetMapping("/api/get/kafkaCluster")
    public List<KafkaCluster> getKafkaCluster() throws Exception{
//        Exec exec = new Exec();
//        exec.shellCommand();
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

    @GetMapping("/api/shellCommand/createCluster")
    public void execShellCommandCreateCluster(){
        shellCommandService.installZabbixAgetnd();
    }
}
