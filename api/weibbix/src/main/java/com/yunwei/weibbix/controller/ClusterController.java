package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.mapper.ClusterMapper;
import com.yunwei.weibbix.mapper.HostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ClusterController {
    @Autowired(required = false)
    private ClusterMapper clusterMapper;

    @Autowired(required = false)
    private HostMapper hostMapper;

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
}
