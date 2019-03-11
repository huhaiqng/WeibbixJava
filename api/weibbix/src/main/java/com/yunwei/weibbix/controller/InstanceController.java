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

    @PostMapping("/api/getHostForCreateInstance")
    public List<Map> getHostForCreateInstance(@RequestBody Map<String,Object> objectMap){
        String hostGroup = (String)objectMap.get("hostGroup");
        String envType = (String)objectMap.get("envType");
        return instanceMapper.getHostForCreateInstanceSQL(hostGroup,envType);
    }
    //保存tomcat实例
    @PostMapping("/api/saveTomcatInstance")
    public void saveTomcatInstance(@RequestBody TomcatInstance tomcatInstance){
        String ip = tomcatInstance.getIp();
        Integer ins_count = instanceMapper.existInstanceCountSQL(tomcatInstance);
        if(ins_count == 0){
            instanceMapper.saveTomcatInstanceSQL(tomcatInstance);
            hostMapper.addHostInstanceNumSQL(ip);
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
    public String deleteTomcatInstance(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String ip = (String)objectMap.get("ip");

        Boolean allocated = instanceMapper.getTomcatInstanceAllocatedByIdSQL(id);
        if(allocated){
            return "该实例已经分配不能删除！";
        }else {
            instanceMapper.deleteTomcatInstanceSQL(id);
            hostMapper.delHostInstanceNumSQL(ip);
            return "删除成功！";
        }
    }
//--------------------------------------------java 实例--------------------------------------------
    //新增java实例
    @PostMapping("/api/saveJavaInstance")
    public String saveJavaInstance(@RequestBody JavaInstance javaInstance){
        String ip = javaInstance.getIp();
        String name = javaInstance.getName();

        Integer count = instanceMapper.getJavaInstanceCountByIpNameSQL(ip,name);
        if(count.equals(0)){
            instanceMapper.saveJavaInstanceSQL(javaInstance);
            hostMapper.addHostInstanceNumSQL(ip);
            return "success";
        }else {
            return "创建失败,实例已存在！";
        }
    }
    //获取java实例
    @PostMapping("/api/getOnePageJavaInstance")
    public PagesListResponse getOnePageJavaInstance(@RequestBody Map<String,Object> objectMap){
        PagesListResponse pagesListResponse = new PagesListResponse();
        String ip = (String)objectMap.get("ip");
        String env= (String)objectMap.get("env");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        Integer beforeNum = (currentPage-1)*count;

        if(ip.equals("")){
            pagesListResponse.setPageList(instanceMapper.selectJavaInstanceByEnvSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectJavaInstanceCountByEnvSQL(env)/count));
        }else{
            pagesListResponse.setPageList(instanceMapper.selectJavaInstanceByEnvIpSQL("%"+ip+"%",env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectJavaInstanceByEnvIpCountSQL("%"+ip+"%",env)/count));
        }

        return pagesListResponse;
    }

    //删除java实例
    @PostMapping("/api/deleteJavaInstance")
    public String deleteJavaInstance(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String ip = (String)objectMap.get("ip");

        Boolean allocated = instanceMapper.getJavaInstanceAllocatedByIdSQL(id);
        if(allocated){
            return "该实例已经分配不能删除！";
        }else {
            instanceMapper.deleteJavaInstanceSQL(id);
            hostMapper.delHostInstanceNumSQL(ip);
            return "success";
        }
    }
//--------------------------------------------Zookeeper 实例--------------------------------------------
    //新增zookeeper实例
    @PostMapping("/api/saveZookeeperInstance")
    public String saveZookeeperInstance(@RequestBody ZookeeperInstance zookeeperInstance){
        String ip = zookeeperInstance.getIp();
        String name = zookeeperInstance.getName();

        Integer count = instanceMapper.getZookeeperInstanceCountByIpNameSQL(ip,name);
        if(count.equals(0)){
            instanceMapper.saveZookeeperInstanceSQL(zookeeperInstance);
            hostMapper.addHostInstanceNumSQL(ip);
            return "success";
        }else {
            return "创建失败,实例已存在！";
        }
    }
    //获取zookeeper实例
    @PostMapping("/api/getOnePageZookeeperInstance")
    public PagesListResponse getOnePageZookeeperInstance(@RequestBody Map<String,Object> objectMap){
        PagesListResponse pagesListResponse = new PagesListResponse();
        String ip = (String)objectMap.get("ip");
        String env= (String)objectMap.get("env");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        Integer beforeNum = (currentPage-1)*count;

        if(ip.equals("")){
            pagesListResponse.setPageList(instanceMapper.selectZookeeperInstanceByEnvSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectZookeeperInstanceCountByEnvSQL(env)/count));
        }else{
            pagesListResponse.setPageList(instanceMapper.selectZookeeperInstanceByEnvIpSQL("%"+ip+"%",env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectZookeeperInstanceByEnvIpCountSQL("%"+ip+"%",env)/count));
        }

        return pagesListResponse;
    }
    //删除Zookeeper实例
    @PostMapping("/api/deleteZookeeperInstance")
    public String deleteZookeeperInstance(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String ip = (String)objectMap.get("ip");

        Boolean allocated = instanceMapper.getZookeeperInstanceAllocatedByIdSQL(id);
        if(allocated){
            return "该实例已经分配不能删除！";
        }else {
            instanceMapper.deleteZookeeperInstanceSQL(id);
            hostMapper.delHostInstanceNumSQL(ip);
            return "success";
        }
    }
//--------------------------------------------kafka--------------------------------------------
    //新增kafka实例
    @PostMapping("/api/saveKafkaInstance")
    public String saveKafkaInstance(@RequestBody KafkaInstance kafkaInstance){
        String ip = kafkaInstance.getIp();
        String name = kafkaInstance.getName();

        Integer count = instanceMapper.getKafkaInstanceCountByIpNameSQL(ip,name);
        if(count.equals(0)){
            instanceMapper.saveKafkaInstanceSQL(kafkaInstance);
            hostMapper.addHostInstanceNumSQL(ip);
            return "success";
        }else {
            return "创建失败,实例已存在！";
        }
    }
    //获取kafka实例
    @PostMapping("/api/getOnePageKafkaInstance")
    public PagesListResponse getOnePageKafkaInstance(@RequestBody Map<String,Object> objectMap){
        PagesListResponse pagesListResponse = new PagesListResponse();
        String ip = (String)objectMap.get("ip");
        String env= (String)objectMap.get("env");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        Integer beforeNum = (currentPage-1)*count;

        if(ip.equals("")){
            pagesListResponse.setPageList(instanceMapper.selectKafkaInstanceByEnvSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectKafkaInstanceCountByEnvSQL(env)/count));
        }else{
            pagesListResponse.setPageList(instanceMapper.selectKafkaInstanceByEnvIpSQL("%"+ip+"%",env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectKafkaInstanceByEnvIpCountSQL("%"+ip+"%",env)/count));
        }

        return pagesListResponse;
    }
    //删除Kafka实例
    @PostMapping("/api/deleteKafkaInstance")
    public String deleteKafkaInstance(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String ip = (String)objectMap.get("ip");

        Boolean allocated = instanceMapper.getKafkaInstanceAllocatedByIdSQL(id);
        if(allocated){
            return "该实例已经分配不能删除！";
        }else {
            instanceMapper.deleteKafkaInstanceSQL(id);
            hostMapper.delHostInstanceNumSQL(ip);
            return "success";
        }
    }

    //--------------------------------------------redis--------------------------------------------
    //新增redis实例
    @PostMapping("/api/saveRedisInstance")
    public String saveRedisInstance(@RequestBody RedisInstance redisInstance){
        String ip = redisInstance.getIp();
        String name = redisInstance.getName();

        Integer count = instanceMapper.getRedisInstanceCountByIpNameSQL(ip,name);
        if(count.equals(0)){
            instanceMapper.saveRedisInstanceSQL(redisInstance);
            hostMapper.addHostInstanceNumSQL(ip);
            return "success";
        }else {
            return "创建失败,实例已存在！";
        }
    }
    //获取redis实例
    @PostMapping("/api/getOnePageRedisInstance")
    public PagesListResponse getOnePageRedisInstance(@RequestBody Map<String,Object> objectMap){
        PagesListResponse pagesListResponse = new PagesListResponse();
        String ip = (String)objectMap.get("ip");
        String env= (String)objectMap.get("env");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        Integer beforeNum = (currentPage-1)*count;

        if(ip.equals("")){
            pagesListResponse.setPageList(instanceMapper.selectRedisInstanceByEnvSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectRedisInstanceCountByEnvSQL(env)/count));
        }else{
            pagesListResponse.setPageList(instanceMapper.selectRedisInstanceByEnvIpSQL("%"+ip+"%",env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)instanceMapper.selectRedisInstanceByEnvIpCountSQL("%"+ip+"%",env)/count));
        }

        return pagesListResponse;
    }
    //删除Redis实例
    @PostMapping("/api/deleteRedisInstance")
    public String deleteRedisInstance(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String ip = (String)objectMap.get("ip");

        Boolean allocated = instanceMapper.getRedisInstanceAllocatedByIdSQL(id);
        if(allocated){
            return "该实例已经分配不能删除！";
        }else {
            instanceMapper.deleteRedisInstanceSQL(id);
            hostMapper.delHostInstanceNumSQL(ip);
            return "success";
        }
    }

}

