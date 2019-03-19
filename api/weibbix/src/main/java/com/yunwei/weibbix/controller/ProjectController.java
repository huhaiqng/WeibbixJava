package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.*;
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
            //通过APP ID获取项目名称
            String app_text = projectMapper.getAppTextByAppIdSQL(appId);
//            if(text.equals("nginx")){
//                projectMapper.updataNginxInstanceProjectSQL(appId,clusterId,app_text);
//            }
            if(text.equals("tomcat")){
                projectMapper.updataTomcatInstanceProjectSQL(appId,clusterId);
            }
//          更新mysql实例所属项目
            if(text.equals("mysql")){
                projectMapper.updataMysqlInstanceProjectSQL(clusterId,app_text);
            }
//          更新zookeeper实例所属项目
            if(text.equals("zookeeper")){
                projectMapper.updataZookeeperInstanceProjectSQL(clusterId,app_text);
            }
//          更新kafka实例所属项目
            if(text.equals("kafka")){
                projectMapper.updataKafkaInstanceProjectSQL(clusterId,app_text);
            }
//          更新mongodb实例所属项目
            if(text.equals("mongodb")){
                projectMapper.updataMongodbInstanceProjectSQL(clusterId,app_text);
            }
//          更新redis实例所属项目
            if(text.equals("redis")){
                projectMapper.updataRedisInstanceProjectSQL(clusterId,app_text);
            }
//          更新rabbitmq实例所属项目
            if(text.equals("rabbitmq")){
                projectMapper.updataRabbitmqInstanceProjectSQL(clusterId,app_text);
            }
//          更新java实例所属项目
            if(text.equals("java")){
                projectMapper.updataJavaInstanceProjectSQL(clusterId,app_text);
            }
            return "success";
        }else {
            return "该项目已经存在该模块！";
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

    //删除项目
    @PostMapping("/api/deleteTreeApp")
    public String deleteTreeApp(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        //查询项目的模块
        Integer modelCount = projectMapper.getTreeModelCountSQL(id);
        if(modelCount.equals(0)){
            String text = projectMapper.getTreeAppTextSQL(id);
            projectMapper.deleteTreeAppSQL(text);
            return "success";
        }else {
            return "还存在模块，不能删除！";
        }
    }

    // ----------------------------------- tomcat -----------------------------------
    //删除模块
    @PostMapping("/api/deleteTreeModel")
    public void deleteTreeModel(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        //通过id获取模块类型
        String text = projectMapper.getModelTextByIdSQL(id);
        //获取项目名称
        String app_text = projectMapper.getAppTextSQL(id);;
        //删除实例项目名称
        if(text.equals("nginx")){
            projectMapper.deleteNginxInstanceProjectSQL(id,app_text);
        }
        if(text.equals("tomcat")){
            projectMapper.deleteTomcatInstanceProjectSQL(id);
        }
        if(text.equals("mysql")){
//          通过模块ID获取集群ID
            String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
            app_text = "";
            projectMapper.updataMysqlInstanceProjectSQL(clusertId,app_text);
        }
        if(text.equals("zookeeper")){
//          通过模块ID获取集群ID
            String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
            app_text = "";
            projectMapper.updataZookeeperInstanceProjectSQL(clusertId,app_text);
        }
        if(text.equals("kafka")){
//          通过模块ID获取集群ID
            String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
            app_text = "";
            projectMapper.updataKafkaInstanceProjectSQL(clusertId,app_text);
        }
        if(text.equals("mongodb")){
//          通过模块ID获取集群ID
            String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
            app_text = "";
            projectMapper.updataMongodbInstanceProjectSQL(clusertId,app_text);
        }
        if(text.equals("redis")){
//          通过模块ID获取集群ID
            String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
            app_text = "";
            projectMapper.updataRedisInstanceProjectSQL(clusertId,app_text);
        }
        if(text.equals("rabbitmq")){
//          通过模块ID获取集群ID
            String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
            app_text = "";
            projectMapper.updataRabbitmqInstanceProjectSQL(clusertId,app_text);
        }
        if(text.equals("java")){
//          通过模块ID获取集群ID
            String clusertId = projectMapper.getClusterIdByModelIdSQL(id);
            app_text = "";
            projectMapper.updataJavaInstanceProjectSQL(clusertId,app_text);
        }
        //删除模块
        projectMapper.deleteTreeModelSQL(id);
    }
    //查询tomcat集群
    @PostMapping("/api/getCluster/tomcat")
    public List<TomcatCluster> getTomcatClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getTomcatClusterByEnvSQL(env);
    }

    //查询nginx集群
    @PostMapping("/api/getCluster/nginx")
    public List<NginxCluster> getNginxClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getNginxClusterByEnvSQL(env);
    }

    //通过集群ID查询tomcat集群
    @PostMapping("/api/getTomcatClusterByClusterId")
    public TomcatCluster getTomcatClusterByClusterId(@RequestBody Map<String,Object>objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getTomcatClusterByClusterIdSQL(clusterId);
    }

    //通过集群ID获取tomcat实例
    @PostMapping("/api/getTomcatInstanceByClusterId")
    public List<TomcatInstance> getTomcatInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getTomcatInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- nginx -----------------------------------
    //通过ID查询nginx集群
    @PostMapping("/api/getNginxClusterByClusterId")
    public NginxCluster getNginxClusterByClusterId(@RequestBody Map<String,Object>objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getNginxClusterByClusterIdSQL(clusterId);
    }

    //通过ID获取nginx实例
    @PostMapping("/api/getNginxInstanceByClusterId")
    public List<NginxInstance> getNginxInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getNginxInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- mysql -----------------------------------
    //查询mysql集群
    @PostMapping("/api/getCluster/mysql")
    public List<MysqlCluster> getMysqlClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getMysqlClusterByEnvSQL(env);
    }
    //通过集群ID获取mysql实例
    @PostMapping("/api/getMysqlInstanceByClusterId")
    public List<MysqlInstance> getMysqlInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getMysqlInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- zookeeper -----------------------------------
    //查询zookeeper集群
    @PostMapping("/api/getCluster/zookeeper")
    public List<ZookeeperCluster> getZookeeperClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getZookeeperClusterByEnvSQL(env);
    }
    //通过集群ID获取zookeeper实例
    @PostMapping("/api/getZookeeperInstanceByClusterId")
    public List<ZookeeperInstance> getZookeeperInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getZookeeperInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- kafka -----------------------------------
    //查询kafka集群
    @PostMapping("/api/getCluster/kafka")
    public List<KafkaCluster> getKafkaClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getKafkaClusterByEnvSQL(env);
    }
    //通过集群ID获取kafka实例
    @PostMapping("/api/getKafkaInstanceByClusterId")
    public List<KafkaInstance> getKafkaInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getKafkaInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- mongodb -----------------------------------
    //查询mongodb集群
    @PostMapping("/api/getCluster/mongodb")
    public List<MongodbCluster> getMongodbClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getMongodbClusterByEnvSQL(env);
    }
    //通过集群ID获取mongodb实例
    @PostMapping("/api/getMongodbInstanceByClusterId")
    public List<MongodbInstance> getMongodbInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getMongodbInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- redis -----------------------------------
    //查询redis集群
    @PostMapping("/api/getCluster/redis")
    public List<RedisCluster> getRedisClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getRedisClusterByEnvSQL(env);
    }
    //通过集群ID获取redis实例
    @PostMapping("/api/getRedisInstanceByClusterId")
    public List<RedisInstance> getRedisInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getRedisInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- rabbitmq -----------------------------------
    //查询rabbitmq集群
    @PostMapping("/api/getCluster/rabbitmq")
    public List<RabbitmqCluster> getRabbitmqClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getRabbitmqClusterByEnvSQL(env);
    }
    //通过集群ID获取rabbitmq实例
    @PostMapping("/api/getRabbitmqInstanceByClusterId")
    public List<RabbitmqInstance> getRabbitmqInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getRabbitmqInstanceByClusterIdSQL(clusterId);
    }

    // ----------------------------------- java -----------------------------------
    //查询java集群
    @PostMapping("/api/getCluster/java")
    public List<JavaCluster> getJavaClusterByEnv(@RequestBody Map<String,Object>objectMap){
        String env = (String)objectMap.get("env");
        return projectMapper.getJavaClusterByEnvSQL(env);
    }
    //通过集群ID获取java实例
    @PostMapping("/api/getJavaInstanceByClusterId")
    public List<JavaInstance> getJavaInstanceByClusterId(@RequestBody Map<String,Object> objectMap){
        String clusterId = (String)objectMap.get("clusterId");
        return projectMapper.getJavaInstanceByClusterIdSQL(clusterId);
    }
}
