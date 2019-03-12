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

//    //----------------------------- kafka -----------------------------
//    @PostMapping("/api/add/kafkaCluster")
//    public void insertKafkaCluster(@RequestBody Map<String,Object> objectMap){
//        String clusterId = (String)objectMap.get("clusterId").toString();
//        String clusterName = (String)objectMap.get("clusterName");
//        String clusterEnv = (String)objectMap.get("clusterEnv");
//
//        clusterMapper.insertKafkaClusterSQL(clusterId,clusterName,clusterEnv);
//    }
//
//    @PostMapping("/api/add/hostCluster")
//    public void insertClusterHost(@RequestBody Map<String,Object> objectMap){
//        String hcId =(String)objectMap.get("hcId").toString();
//        String hostId = (String)objectMap.get("hostId").toString();
//        String clusterId = (String)objectMap.get("clusterId").toString();
//
//        clusterMapper.insertClusterHostSQL(hcId,hostId,clusterId);
//        hostMapper.updateHostAllocatedSQL(hostId,true);
//    }
//
//    @GetMapping("/api/get/kafkaCluster")
//    public List<KafkaCluster> getKafkaCluster() throws Exception{
//        return clusterMapper.selectAllKafkaCusterSQL();
//    }
//
//    @PostMapping("/api/get/clusterMember")
//    public List<String> getClusterMember(@RequestBody Map<String,Object> objectMap){
//        String clusterId = (String)objectMap.get("clusterId");
//        return clusterMapper.selectClusterMemberSQL(clusterId);
//    }
//
//    @PostMapping("/api/delete/kafkaCluster")
//    public void deleteKafkaCluster(@RequestBody Map<String,Object> objectMap){
//
//    }
//
//    @PostMapping("/api/shellCommand/createCluster")
//    public void execShellCommandCreateCluster(@RequestBody Map<String,Object> objectMap){
//        String topic_uri = (String)objectMap.get("topic_uri");
//        System.out.println(topic_uri);
//        shellCommandService.installZabbixAgetnd(topic_uri);
//    }
//
//    @PostMapping("/api/getKafkaNoAllocatedHost")
//    public List<String> getKafkaNoAllocatedHost(@RequestBody Map<String,Object> objectMap){
//        String clusterEnv = (String)objectMap.get("clusterEnv");
//        return clusterMapper.getKafkaNoAllocatedHostSQL(clusterEnv);
//    }
//
//    @PostMapping("/api/add/kafkaClusterHost")
//    public void addKafkaClusterHost(@RequestBody Map<String,Object> objectMap){
//        String hcId =(String)objectMap.get("hcId").toString();
//        String clusterId = (String)objectMap.get("clusterId");
//        String ip = (String)objectMap.get("ip");
//        String hostId = hostMapper.selectHostIdByIpSQL(ip);
//        clusterMapper.addKafkaClusterHostSQL(hcId,hostId,clusterId);
//        hostMapper.updateHostAllocatedSQL(hostId,true);
//    }
//
//    @PostMapping("/api/del/kafkaClusterHost")
//    public void delKafkaClusterHost(@RequestBody Map<String,Object> objectMap){
//        String clusterId = (String)objectMap.get("clusterId");
//        String ip = (String)objectMap.get("ip");
//        String hostId = hostMapper.selectHostIdByIpSQL(ip);
//        System.out.println(hostId);
//        System.out.println(clusterId);
//        clusterMapper.delKafkaClusterHostSQL(hostId,clusterId);
//        hostMapper.updateHostAllocatedSQL(hostId,false);
//    }

    //----------------------------- tomcat -----------------------------
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

    //----------------------------- nginx -----------------------------
    //获取未分配nginx实例
    @PostMapping("/api/getNotAllocatedNginxInstance")
    public List<NginxInstance> getNotAllocatedNginxInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedNginxInstanceSQL(env);
    }

    //保存nginx集群
    @PostMapping("/api/addNginxCluster")
    public void addNginxCluster(@RequestBody NginxCluster nginxCluster){
        clusterMapper.addNginxClusterSQL(nginxCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addNginxInstanceCluster")
    public void addNginxInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addNginxInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateNginxInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取nginx集群
    @PostMapping("/api/getNginxCluster")
    public PagesListResponse getNginxCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getNginxClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getNginxClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getNginxClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getNginxClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getNginxInstancesByClusterId")
    public List<NginxInstance> getNginxInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getNginxInstancesByClusterIdSQL(clusterId);
    }

    //删除nginx集群实例
    @PostMapping("/api/deleteNginxClusterInstance")
    public void deleteNginxClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteNginxClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateNginxInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getNginxClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteNginxClusterSQL(clusterId);
        }
    }

    //----------------------------- mysql -----------------------------
    //获取未分配mysql实例
    @PostMapping("/api/getNotAllocatedMysqlInstance")
    public List<MysqlInstance> getNotAllocatedMysqlInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedMysqlInstanceSQL(env);
    }

    //保存mysql集群
    @PostMapping("/api/addMysqlCluster")
    public void addMysqlCluster(@RequestBody MysqlCluster mysqlCluster){
        clusterMapper.addMysqlClusterSQL(mysqlCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addMysqlInstanceCluster")
    public void addMysqlInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addMysqlInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateMysqlInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取mysql集群
    @PostMapping("/api/getMysqlCluster")
    public PagesListResponse getMysqlCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getMysqlClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getMysqlClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getMysqlClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getMysqlClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getMysqlInstancesByClusterId")
    public List<MysqlInstance> getMysqlInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getMysqlInstancesByClusterIdSQL(clusterId);
    }

    //删除mysql集群实例
    @PostMapping("/api/deleteMysqlClusterInstance")
    public void deleteMysqlClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteMysqlClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateMysqlInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getMysqlClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteMysqlClusterSQL(clusterId);
        }
    }

    //----------------------------- zookeeper -----------------------------
    //获取未分配zookeeper实例
    @PostMapping("/api/getNotAllocatedZookeeperInstance")
    public List<ZookeeperInstance> getNotAllocatedZookeeperInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedZookeeperInstanceSQL(env);
    }

    //保存zookeeper集群
    @PostMapping("/api/addZookeeperCluster")
    public void addZookeeperCluster(@RequestBody ZookeeperCluster zookeeperCluster){
        clusterMapper.addZookeeperClusterSQL(zookeeperCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addZookeeperInstanceCluster")
    public void addZookeeperInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addZookeeperInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateZookeeperInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取zookeeper集群
    @PostMapping("/api/getZookeeperCluster")
    public PagesListResponse getZookeeperCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getZookeeperClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getZookeeperClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getZookeeperClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getZookeeperClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getZookeeperInstancesByClusterId")
    public List<ZookeeperInstance> getZookeeperInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getZookeeperInstancesByClusterIdSQL(clusterId);
    }

    //删除zookeeper集群实例
    @PostMapping("/api/deleteZookeeperClusterInstance")
    public void deleteZookeeperClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteZookeeperClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateZookeeperInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getZookeeperClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteZookeeperClusterSQL(clusterId);
        }
    }

    //----------------------------- kafka -----------------------------
    //获取未分配kafka实例
    @PostMapping("/api/getNotAllocatedKafkaInstance")
    public List<KafkaInstance> getNotAllocatedKafkaInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedKafkaInstanceSQL(env);
    }

    //保存kafka集群
    @PostMapping("/api/addKafkaCluster")
    public void addKafkaCluster(@RequestBody KafkaCluster kafkaCluster){
        clusterMapper.addKafkaClusterSQL(kafkaCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addKafkaInstanceCluster")
    public void addKafkaInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addKafkaInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateKafkaInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取kafka集群
    @PostMapping("/api/getKafkaCluster")
    public PagesListResponse getKafkaCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getKafkaClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getKafkaClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getKafkaClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getKafkaClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getKafkaInstancesByClusterId")
    public List<KafkaInstance> getKafkaInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getKafkaInstancesByClusterIdSQL(clusterId);
    }

    //删除kafka集群实例
    @PostMapping("/api/deleteKafkaClusterInstance")
    public void deleteKafkaClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteKafkaClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateKafkaInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getKafkaClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteKafkaClusterSQL(clusterId);
        }
    }

    //----------------------------- mongodb -----------------------------
    //获取未分配mongodb实例
    @PostMapping("/api/getNotAllocatedMongodbInstance")
    public List<MongodbInstance> getNotAllocatedMongodbInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedMongodbInstanceSQL(env);
    }

    //保存mongodb集群
    @PostMapping("/api/addMongodbCluster")
    public void addMongodbCluster(@RequestBody MongodbCluster mongodbCluster){
        clusterMapper.addMongodbClusterSQL(mongodbCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addMongodbInstanceCluster")
    public void addMongodbInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addMongodbInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateMongodbInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取mongodb集群
    @PostMapping("/api/getMongodbCluster")
    public PagesListResponse getMongodbCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getMongodbClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getMongodbClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getMongodbClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getMongodbClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getMongodbInstancesByClusterId")
    public List<MongodbInstance> getMongodbInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getMongodbInstancesByClusterIdSQL(clusterId);
    }

    //删除mongodb集群实例
    @PostMapping("/api/deleteMongodbClusterInstance")
    public void deleteMongodbClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteMongodbClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateMongodbInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getMongodbClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteMongodbClusterSQL(clusterId);
        }
    }

    //----------------------------- redis -----------------------------
    //获取未分配redis实例
    @PostMapping("/api/getNotAllocatedRedisInstance")
    public List<RedisInstance> getNotAllocatedRedisInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedRedisInstanceSQL(env);
    }

    //保存redis集群
    @PostMapping("/api/addRedisCluster")
    public void addRedisCluster(@RequestBody RedisCluster redisCluster){
        clusterMapper.addRedisClusterSQL(redisCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addRedisInstanceCluster")
    public void addRedisInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addRedisInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateRedisInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取redis集群
    @PostMapping("/api/getRedisCluster")
    public PagesListResponse getRedisCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getRedisClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getRedisClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getRedisClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getRedisClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getRedisInstancesByClusterId")
    public List<RedisInstance> getRedisInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getRedisInstancesByClusterIdSQL(clusterId);
    }

    //删除redis集群实例
    @PostMapping("/api/deleteRedisClusterInstance")
    public void deleteRedisClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteRedisClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateRedisInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getRedisClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteRedisClusterSQL(clusterId);
        }
    }

    //----------------------------- rabbitmq -----------------------------
    //获取未分配rabbitmq实例
    @PostMapping("/api/getNotAllocatedRabbitmqInstance")
    public List<RabbitmqInstance> getNotAllocatedRabbitmqInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedRabbitmqInstanceSQL(env);
    }

    //保存rabbitmq集群
    @PostMapping("/api/addRabbitmqCluster")
    public void addRabbitmqCluster(@RequestBody RabbitmqCluster rabbitmqCluster){
        clusterMapper.addRabbitmqClusterSQL(rabbitmqCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addRabbitmqInstanceCluster")
    public void addRabbitmqInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addRabbitmqInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateRabbitmqInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取rabbitmq集群
    @PostMapping("/api/getRabbitmqCluster")
    public PagesListResponse getRabbitmqCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getRabbitmqClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getRabbitmqClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getRabbitmqClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getRabbitmqClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getRabbitmqInstancesByClusterId")
    public List<RabbitmqInstance> getRabbitmqInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getRabbitmqInstancesByClusterIdSQL(clusterId);
    }

    //删除rabbitmq集群实例
    @PostMapping("/api/deleteRabbitmqClusterInstance")
    public void deleteRabbitmqClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteRabbitmqClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateRabbitmqInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getRabbitmqClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteRabbitmqClusterSQL(clusterId);
        }
    }

    //----------------------------- java -----------------------------
    //获取未分配java实例
    @PostMapping("/api/getNotAllocatedJavaInstance")
    public List<JavaInstance> getNotAllocatedJavaInstance(@RequestBody Map<String,Object> objectMap){
        String env = (String)objectMap.get("env");
        return clusterMapper.getNotAllocatedJavaInstanceSQL(env);
    }

    //保存java集群
    @PostMapping("/api/addJavaCluster")
    public void addJavaCluster(@RequestBody JavaCluster javaCluster){
        clusterMapper.addJavaClusterSQL(javaCluster);
    }
    //保存实例-集群
    @PostMapping("/api/addJavaInstanceCluster")
    public void addJavaInstanceCluster(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");
        clusterMapper.addJavaInstanceClusterSQL(id,instanceId,clusterId);
        //将实例状态改为已分配，设置实例的集群名
        boolean allocated = true;
        clusterMapper.updateJavaInstanceAllocatedSQL(allocated,instanceId);
    }

    //获取java集群
    @PostMapping("/api/getJavaCluster")
    public PagesListResponse getJavaCluster(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        String name = (String)objectMap.get("name");
        String env = (String)objectMap.get("env");
        Integer beforeNum = (currentPage-1)*count;
        PagesListResponse pagesListResponse = new PagesListResponse();
        if(name.equals("")){
            pagesListResponse.setPageList(clusterMapper.getJavaClusterSQL(env,beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getJavaClusterCoutSQL(env)/count));
        }else{
            pagesListResponse.setPageList(clusterMapper.getJavaClusterByNameSQL(env,"%"+name+"%",beforeNum,count));
            pagesListResponse.setPages((int)Math.ceil((float)clusterMapper.getJavaClusterCoutByNameSQL(env,"%"+name+"%")/count));;
        }
        return pagesListResponse;
    }
    //通过集群id获取该集群所有的实例
    @PostMapping("/api/getJavaInstancesByClusterId")
    public List<JavaInstance> getJavaInstancesByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return clusterMapper.getJavaInstancesByClusterIdSQL(clusterId);
    }

    //删除java集群实例
    @PostMapping("/api/deleteJavaClusterInstance")
    public void deleteJavaClusterInstance(@RequestBody Map<String,Object> objectMap){
        String instanceId = (String)objectMap.get("instanceId");
        String clusterId = (String)objectMap.get("clusterId");

        clusterMapper.deleteJavaClusterInstanceSQL(instanceId);
        //更改实例状态
        boolean allocated = false;
        String name = "";
        clusterMapper.updateJavaInstanceAllocatedSQL(allocated,instanceId);
        //获取还存在的实例数量
        Integer instanceCount = clusterMapper.getJavaClusterInstanceCountSQL(clusterId);
        if(instanceCount.equals(0)){
            clusterMapper.deleteJavaClusterSQL(clusterId);
        }
    }
}
