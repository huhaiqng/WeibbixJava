-- MySQL dump 10.13  Distrib 5.7.20, for linux-glibc2.12 (x86_64)
--
-- Host: localhost    Database: weibbix
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `weibbix`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `weibbix` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `weibbix`;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `addr` varchar(255) NOT NULL,
  `notice` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('1554113044290','阿里云(网络)','qhebusbar','Bsb/2018','Web','https://www.aliyun.com','网络公司阿里云账号'),('1554113603826','阿里云(科技)','busbar@ebusbar.net','abc@1234','Web','https://www.aliyun.com','科技公司阿里云账号'),('1554169568651','Gitlab','root','Bsb/2018','Web','http://gitlab.qhebusbar.com:880','内网：http://188.188.1.121'),('1554170180018','防火墙(办公室)','admin','Bsb.net@2018','Web','https://192.168.1.1:8443','办公室防火墙管理员账号'),('1554170295729','私有云管理平台','administrator@vsphere.local','Abc@123456','Web','https://172.16.2.32','私有云管理员账号'),('1554170499160','防火墙(电信机房)','admin','Bsb.net@2018','Web','https://59.37.126.60:8443','内网:https://172.16.3.2:8443    备用:http://59.37.126.60:8844'),('1554171342670','Zabbix','Admin','Bsb.net@2018','Web','http://59.37.126.60:90','Zabbix 管理员账号'),('1554171446550','V5030 存储','superuser','Abc@123456','Web','https://172.16.2.16','备用: https://172.16.2.17'),('1554171710005','邮箱','huhaiqing@ebusbar.net','Hu/2018','Web','https://exmail.qq.com/cgi-bin/loginpage','办公邮箱账号'),('1554171780789','路由器(没使用)','admin','bsb.2017.B','Web','https://172.16.3.2:8443','原电信机房路由器管理员账号'),('1554171934372','IT基础设施管理平台','sysadmin','Yacmp123','Web','http://172.16.2.35',''),('1554172055708','核心交换机','admin','Abc@123456','Web','https://172.16.2.1','电信机房核心交换机管理员账号'),('1554178634547','蓝鲸','admin','Bsb.net@2018','Web','http://paas.qhebusbar.com','内网: http://192.168.1.253'),('1554178674060','电信备案','qhebusbar','a111111','Web','http://beian.ct10000.com/icp/index.jsp',''),('1554178762355','办公室电信上网','075505273080@163.gd','ANGIFXUG','Web','http://www.189.cn/','办公室电信上网账号'),('1554178884963','wifi 密码','','86251115','Other','BSB-NW',''),('1554179152610','开发 Linux','devuser','3Y2h8vf1','Other','','生产、测试开发人员使用'),('1554179254818','生产百跑 tomcat','tomcat','XCxR6nI8','Other','','百跑生产环境 jar 包启动账号'),('1554179344978','禅道','admin','Bsbnet123','Web','http://zentao.qhebusbar.net:90/zentao/',''),('1554179425769','生产环境 FTP 用户','ftpuser','8BQ9Z4yU','Other','','用于上传静态文件'),('1554183353039','Oracle 管理员',' sys/system','eklcX6u9!zny','Oracle','172.16.1.11、172.16.1.12','生产 Oracle 管理员账号'),('1554183535302','生产 BBOG','BBGO','84HxY@2T','Oracle','172.16.1.11、172.16.1.12','IIS 连接数据库账号'),('1554183660071','百跑 MySQL 管理员','root','256KorF0*81C','MySQL','172.16.1.36','生产百跑MySQL管理员'),('1554183917366','百跑MySQL数据库','baipao','8yBC*L5yc','MySQL','172.16.1.36 172.16.1.46','只有 ebusbar_baipao 权限，开发人员使用'),('1554184088237','生产VPN','huhaiqing','Bsb848','VPN','59.37.126.35:9443','用于连接生产VPN'),('1554184451612','Zabbix MySQL','root@\'localhost\'','MySQL2018','MySQL','172.16.2.39','Zabbix MySQL 数据库本地管理员账号'),('1554185363306','ESXi01','root','Abc@123456','Esxi','https://172.16.2.26','CMM: https://172.16.2.18    IMM: https://172.16.2.19 '),('1554185559353','ESXi02','root','Abc@123456','Esxi','https://172.16.2.27','CMM: https://172.16.2.18    IMM: https://172.16.2.20'),('1554185631049','ESXi03','root','Abc@123456','Esxi','https://172.16.2.28','CMM: https://172.16.2.18    IMM: https://172.16.2.21'),('1554185785953','ESXi04','root','Abc@123456','Esxi','https://172.16.2.29','CMM: https://172.16.2.18    IMM: https://172.16.2.22'),('1554185863089','ESXi05','root','Abc@123456','Esxi','https://172.16.2.30','CMM: https://172.16.2.18    IMM: https://172.16.2.23'),('1554185941512','testesxi01','root','bsb2018','Esxi','192.168.1.241','南山测试服务器'),('1554185997440','testesxi02','root','bsbnet2018','Esxi','https://188.188.1.31','坪山测试服务器');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_type` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_type`
--

LOCK TABLES `account_type` WRITE;
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
INSERT INTO `account_type` VALUES ('001','Web'),('002','MySQL'),('003','Oracle'),('004','VPN'),('005','Esxi'),('999','Other');
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cluster`
--

DROP TABLE IF EXISTS `cluster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cluster` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `env` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`type`,`env`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cluster`
--

LOCK TABLES `cluster` WRITE;
/*!40000 ALTER TABLE `cluster` DISABLE KEYS */;
INSERT INTO `cluster` VALUES ('1553248264458','baipao_nginx_web_cluster','pro','nginx-web','2019-03-22 17:51:04'),('1553248998680','nginx_proxy_cluster','pro','nginx-proxy','2019-03-22 18:03:19'),('1553478979766','gps_java_cluster_pro','pro','java','2019-03-25 09:56:20'),('1553479855524','gps_zookeeper_cluster_pro','pro','zookeeper','2019-03-25 10:10:56'),('1553480004099','gps_kafka_cluster_pro','pro','kafka','2019-03-25 10:13:24'),('1553480971170','gps_mongodb_cluster_pro','pro','mongodb','2019-03-25 10:29:31'),('1553481425760','gps_redis_cluster_pro','pro','redis','2019-03-25 10:37:06'),('1553481748295','baipao_manager_cluster_pro','pro','java','2019-03-25 10:42:28'),('1553481777070','bapao_driverapp_cluster_pro','pro','java','2019-03-25 10:42:57'),('1553506389622','mysql_cluster_pro01','pro','mysql','2019-03-25 17:33:10'),('1553507465947','baipao_redis_cluster_pro01','pro','redis','2019-03-25 17:51:06');
/*!40000 ALTER TABLE `cluster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hosts`
--

DROP TABLE IF EXISTS `hosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hosts` (
  `hostId` varchar(255) NOT NULL,
  `hostName` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `envType` varchar(255) NOT NULL,
  `hostGroup` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `rootPassword` varchar(255) NOT NULL,
  `allocated` bit(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `osVersion` varchar(255) NOT NULL,
  `configuration` varchar(255) NOT NULL,
  `hostType` varchar(255) NOT NULL,
  `esxiIp` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `cluster` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `ins_num` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`hostId`),
  UNIQUE KEY `ip` (`ip`,`hostGroup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hosts`
--

LOCK TABLES `hosts` WRITE;
/*!40000 ALTER TABLE `hosts` DISABLE KEYS */;
INSERT INTO `hosts` VALUES ('38388392831175377','baipao01','172.16.1.55','pro','java','机房','ZwdGacGq','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','虚拟机','172.16.2.27','',NULL,NULL,3),('38388392836648009','baipao02','172.16.1.65','pro','java','机房','Ret46gRa','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','虚拟机','172.16.2.30','',NULL,NULL,3),('38388392840320783','baipao01','172.16.1.55','pro','nginx-web','机房','ZwdGacGq','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','虚拟机','172.16.2.27','',NULL,NULL,3),('38388392846467727','baipao02','172.16.1.65','pro','nginx-web','机房','Ret46gRa','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','虚拟机','172.16.2.30','',NULL,NULL,3),('38389107804771259','Server-qmeg73','172.16.1.52','pro','nginx-proxy','机房','9j5NeHHz','\0','2019-03-22 10:01:31','CentOS 7','4C 8G 40G','虚拟机','172.16.2.28','',NULL,NULL,1),('38619172016364368','gps-web02','192.168.1.36','pro','java','机房','7y4QLnP8$','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,1),('38619172018164914','gps-mongodb01','192.168.1.37','pro','mongodb','机房','a6J284IV','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,1),('38619172020065960','gps-web01','192.168.1.35','pro','java','机房','658u8qXR%','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,2),('38619172021269360','gps-kafka02','192.168.1.33','pro','kafka','机房','L22Lr9yq','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,2),('38619172022481128','gps-kafka03','192.168.1.34','pro','kafka','机房','dhh2S75K','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,2),('38619172023586341','gps-mongodb03','192.168.1.39','pro','mongodb','机房','ZsM57MR8','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,1),('38619172024658446','gps-kafka01','192.168.1.32','pro','kafka','机房','Fct65MEH','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,2),('38619172025725027','gps-mongodb02','192.168.1.38','pro','mongodb','机房','IJ6cK22F','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,1),('38619172026861099','gps-kafka02','192.168.1.33','pro','zookeeper','机房','L22Lr9yq','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,2),('38619172027954727','gps-kafka03','192.168.1.34','pro','zookeeper','机房','dhh2S75K','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,2),('38619172029097853','gps-kafka01','192.168.1.32','pro','zookeeper','机房','Fct65MEH','\0','2019-03-25 01:55:55','CentOS 7','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,2),('38621662910885667','gps-web01','192.168.1.35','pro','redis','机房','658u8qXR%','\0','2019-03-25 02:37:26','CentOS 9','4C 8G 40G','虚拟机',NULL,'',NULL,NULL,1),('38646504133029352','mysql-master','172.16.1.36','pro','mysql','机房','E4LzEvhT','\0','2019-03-25 09:31:28','CentOS 7','8C 16G 80G','虚拟机','172.16.2.30','',NULL,NULL,2),('38646504141420143','mysql-slave','172.16.1.46','pro','mysql','机房','82E1ph6R','\0','2019-03-25 09:31:28','CentOS 7','8C 16G 80G','虚拟机','172.16.2.28','',NULL,NULL,1),('38646504144634506','dataguard','192.168.1.40','pro','mysql','阿里云','P684+*Sgx8Xt','\0','2019-03-25 09:31:28','CentOS 7','8C 16G 80G','虚拟机','172.16.2.28','',NULL,NULL,1),('38647656712611490','mysql-master','172.16.1.36','pro','redis','机房','E4LzEvhT','\0','2019-03-25 09:50:40','CentOS 7','8C 16G 80G','虚拟机','172.16.2.30','',NULL,NULL,1);
/*!40000 ALTER TABLE `hosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instance`
--

DROP TABLE IF EXISTS `instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instance` (
  `id` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dir` varchar(255) NOT NULL,
  `env` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `allocated` bit(1) NOT NULL,
  `cluster` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instance`
--

LOCK TABLES `instance` WRITE;
/*!40000 ALTER TABLE `instance` DISABLE KEYS */;
INSERT INTO `instance` VALUES ('1553248227770','172.16.1.55','80','baipao_nginx_web_instance','/var/www/html','pro','nginx-web','','baipao_nginx_web_cluster','新百跑 Manager'),('1553248227813','172.16.1.65','80','baipao_nginx_web_instance','/var/www/html','pro','nginx-web','','baipao_nginx_web_cluster','新百跑 Manager'),('1553248966305','172.16.1.52','80 443','nginx_proxy01','/var/www/html','pro','nginx-proxy','','nginx_proxy_cluster','旧百跑微信 API'),('1553478948382','192.168.1.35','88','gps_java_instance_pro','/data/apps','pro','java','','gps_java_cluster_pro','GPS 数据处理系统'),('1553478948450','192.168.1.36','88','gps_java_instance_pro','/data/apps','pro','java','','gps_java_cluster_pro','GPS 数据处理系统'),('1553479471597','192.168.1.32','9092','gps_kafka_instance_pro','/usr/local/kafka','pro','kafka','','gps_kafka_cluster_pro','GPS 数据处理系统'),('1553479471703','192.168.1.33','9092','gps_kafka_instance_pro','/usr/local/kafka','pro','kafka','','gps_kafka_cluster_pro','GPS 数据处理系统'),('1553479471748','192.168.1.34','9092','gps_kafka_instance_pro','/usr/local/kafka','pro','kafka','','gps_kafka_cluster_pro','GPS 数据处理系统'),('1553479804172','192.168.1.32','2181    13888','gps_zookeeper_instance_pro','/usr/local/zookeeper','pro','zookeeper','','gps_zookeeper_cluster_pro','GPS 数据处理系统'),('1553479804233','192.168.1.33','2181    13888','gps_zookeeper_instance_pro','/usr/local/zookeeper','pro','zookeeper','','gps_zookeeper_cluster_pro','GPS 数据处理系统'),('1553479804283','192.168.1.34','2181    13888','gps_zookeeper_instance_pro','/usr/local/zookeeper','pro','zookeeper','','gps_zookeeper_cluster_pro','GPS 数据处理系统'),('1553480944113','192.168.1.37','27001','gps_mongodb_instance_pro','/usr/local/mongodb','pro','mongodb','','gps_mongodb_cluster_pro','GPS 数据处理系统'),('1553480944180','192.168.1.38','27001','gps_mongodb_instance_pro','/usr/local/mongodb','pro','mongodb','','gps_mongodb_cluster_pro','GPS 数据处理系统'),('1553480944206','192.168.1.39','27001','gps_mongodb_instance_pro','/usr/local/mongodb','pro','mongodb','','gps_mongodb_cluster_pro','GPS 数据处理系统'),('1553481403688','192.168.1.35','6379','gps_redis_instance_pro','/usr/local/bin/redis-server','pro','redis','','gps_redis_cluster_pro','GPS 数据处理系统'),('1553481652775','172.16.1.55','8444','baipao_manager_instance_pro','/usr/local/baipao/manager/','pro','java','','baipao_manager_cluster_pro','新百跑 Manager'),('1553481652825','172.16.1.65','8444','baipao_manager_instance_pro','/usr/local/baipao/manager/','pro','java','','baipao_manager_cluster_pro','新百跑 Manager'),('1553481695719','172.16.1.55','8666','baipao_driverapp_instance_pro','/usr/local/baipao/driverapp','pro','java','','bapao_driverapp_cluster_pro','新百跑 Driverapp'),('1553481695759','172.16.1.65','8666','baipao_driverapp_instance_pro','/usr/local/baipao/driverapp','pro','java','','bapao_driverapp_cluster_pro','新百跑 Driverapp'),('1553506291504','172.16.1.36','3306','mysql_master_instance_pro','/var/lib/mysql','pro','mysql','','mysql_cluster_pro01','新百跑 Manager'),('1553506319903','172.16.1.46','3306','mysql_slave_instance_pro01','/usr/local/mysql','pro','mysql','','mysql_cluster_pro01','新百跑 Manager'),('1553506361319','192.168.1.40','3306','mysql_slave_instance_pro02','/var/lib/mysql','pro','mysql','','mysql_cluster_pro01','新百跑 Manager'),('1553507440380','172.16.1.36','6379','baipao_redis_instance_pro01','/usr/local/redis','pro','redis','','baipao_redis_cluster_pro01','新百跑 Manager');
/*!40000 ALTER TABLE `instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instance_cluster`
--

DROP TABLE IF EXISTS `instance_cluster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instance_cluster` (
  `id` varchar(255) NOT NULL,
  `instanceId` varchar(255) NOT NULL,
  `clusterId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instance_cluster`
--

LOCK TABLES `instance_cluster` WRITE;
/*!40000 ALTER TABLE `instance_cluster` DISABLE KEYS */;
INSERT INTO `instance_cluster` VALUES ('1553248264514','1553248227770','1553248264458'),('1553248264536','1553248227813','1553248264458'),('1553248998724','1553248966305','1553248998680'),('1553478979805','1553478948382','1553478979766'),('1553478979819','1553478948450','1553478979766'),('1553479855561','1553479804172','1553479855524'),('1553479855578','1553479804233','1553479855524'),('1553479855596','1553479804283','1553479855524'),('1553480004140','1553479471597','1553480004099'),('1553480004152','1553479471703','1553480004099'),('1553480004166','1553479471748','1553480004099'),('1553480971207','1553480944113','1553480971170'),('1553480971224','1553480944180','1553480971170'),('1553480971241','1553480944206','1553480971170'),('1553481425804','1553481403688','1553481425760'),('1553481748338','1553481652775','1553481748295'),('1553481748356','1553481652825','1553481748295'),('1553481777110','1553481695719','1553481777070'),('1553481777123','1553481695759','1553481777070'),('1553506389671','1553506291504','1553506389622'),('1553506389702','1553506319903','1553506389622'),('1553506389721','1553506361319','1553506389622'),('1553507465987','1553507440380','1553507465947');
/*!40000 ALTER TABLE `instance_cluster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_token`
--

DROP TABLE IF EXISTS `oauth_access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_access_token` (
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `token_id` varchar(255) DEFAULT NULL,
  `token` blob,
  `authentication_id` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `authentication` blob,
  `refresh_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_token`
--

LOCK TABLES `oauth_access_token` WRITE;
/*!40000 ALTER TABLE `oauth_access_token` DISABLE KEYS */;
INSERT INTO `oauth_access_token` VALUES ('2019-04-12 01:23:58','fb8bf735e898ce96850874cc98be0230','�\�\0sr\0Corg.springframework.security.oauth2.common.DefaultOAuth2AccessToken��6$�\�\0L\0additionalInformationt\0Ljava/util/Map;L\0\nexpirationt\0Ljava/util/Date;L\0refreshTokent\0?Lorg/springframework/security/oauth2/common/OAuth2RefreshToken;L\0scopet\0Ljava/util/Set;L\0	tokenTypet\0Ljava/lang/String;L\0valueq\0~\0xpsr\0java.util.Collections$EmptyMapY6�Z\�\�\�\0\0xpsr\0java.util.Datehj�KYt\0\0xpw\0\0jKExsr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationq\0~\0xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valueq\0~\0xpt\0$c06e7441-3a38-4262-b7c8-3d9b80a356c5sq\0~\0	w\0\0jKExsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0ct\0Ljava/util/Collection;xpsr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writext\0bearert\0$e22abdef-b8c1-4984-9cd9-ff040cdecd31','578e2a355d165ba24732043b788db7e6','admin','test','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0=','e15fe2883bf5ca800bf3684c84ee503a');
/*!40000 ALTER TABLE `oauth_access_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_token`
--

DROP TABLE IF EXISTS `oauth_refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_refresh_token` (
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `token_id` varchar(255) DEFAULT NULL,
  `token` blob,
  `authentication` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_token`
--

LOCK TABLES `oauth_refresh_token` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_token` DISABLE KEYS */;
INSERT INTO `oauth_refresh_token` VALUES ('2019-03-22 08:22:02','e9917333d93fbafb91a2fbd9cb4438bd','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$43e4a566-3279-4260-ae58-83bd4b944f71sr\0java.util.Datehj�KYt\0\0xpw\0\0i��{\�x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-03-25 01:23:58','ec3187421f1828c9bf687f35d714e4e5','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$4ce12b39-76e2-4569-9411-116acd1f5ecesr\0java.util.Datehj�KYt\0\0xpw\0\0i��\�\�x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-03-29 05:54:29','b6e7c4ab029b76e20865b3665b914795','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$7de3cfa7-b93c-45b6-ac57-3059038f74a4sr\0java.util.Datehj�KYt\0\0xpw\0\0i\�)\�cx','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-01 02:54:55','f06a62423576644b372e1332f418909a','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$fe9cd692-2cca-42ed-9ef3-ec52e43a8268sr\0java.util.Datehj�KYt\0\0xpw\0\0i\���\�x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-02 04:17:08','8a3ffd172a9bc0cedb17ebadaed15938','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$405abe25-d6be-401b-a21b-f1e5b8d51e40sr\0java.util.Datehj�KYt\0\0xpw\0\0i\�j8x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-03 09:16:13','9f9380e84bde6749c9d0554b5fa1dabf','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$9b06282f-ce08-4f5b-93a1-624b1007f326sr\0java.util.Datehj�KYt\0\0xpw\0\0i\�e\�x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-04 09:19:17','7834213a8b56386b6946b1dac96c2d1c','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$6161dc5f-9e5f-45d3-b334-83ef1030ab61sr\0java.util.Datehj�KYt\0\0xpw\0\0i\�ːx','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-08 01:28:12','9efce6c43514939340dcd71fd1569697','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$4bce419d-cd44-48bf-a34e-a7a60c62c0c2sr\0java.util.Datehj�KYt\0\0xpw\0\0i����x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-09 09:53:02','13153e96fec99d5b2aaea9a78a15e349','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$e34c7467-f501-4844-b654-d1427f7a0a4asr\0java.util.Datehj�KYt\0\0xpw\0\0j�B�x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-10 10:34:59','39e299b784b9306d710392b127e4d7ec','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$4fecd5ab-b05d-474c-a501-fd71ec7eb715sr\0java.util.Datehj�KYt\0\0xpw\0\0j��x','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0='),('2019-04-12 01:23:58','e15fe2883bf5ca800bf3684c84ee503a','�\�\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\�Gc�\�ɷ\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\�\ncT\�^\0L\0valuet\0Ljava/lang/String;xpt\0$c06e7441-3a38-4262-b7c8-3d9b80a356c5sr\0java.util.Datehj�KYt\0\0xpw\0\0jKEx','�\�\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2Authentication�@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenӪ(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList�%1�\�\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0�\�^�\0L\0cq\0~\0xpsr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>�qi�\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMap��t�B\0L\0mq\0~\0xpsr\0java.util.HashMap\��\�`\�\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSet��я��U\0\0xq\0~\0	sr\0java.util.LinkedHashSet\�l\�Z�\�*\0\0xr\0java.util.HashSet�D�����4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0�\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4�N\\l��\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetails�\�Y/�Y�\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0�\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSetݘP��\�[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0�\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:�n\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigInteger����;�\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.Number����\��\0\0xp����������������\0\0\0ur\0[B���T\�\0\0xp\0\0\0Lxq\0~\0=');
/*!40000 ALTER TABLE `oauth_refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `software` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
INSERT INTO `software` VALUES ('211','apache'),('311','iis'),('301','java'),('501','kafka'),('431','mongodb'),('401','mysql'),('101','nginx-proxy'),('201','nginx-web'),('411','oracle'),('421','redis'),('511','zookeeper');
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_app`
--

DROP TABLE IF EXISTS `tree_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree_app` (
  `id` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `env` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `text` (`text`,`env`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_app`
--

LOCK TABLES `tree_app` WRITE;
/*!40000 ALTER TABLE `tree_app` DISABLE KEYS */;
INSERT INTO `tree_app` VALUES ('app_1553243809686_dev','旧百跑 APP API','glyphicon glyphicon-th-large','dev'),('app_1553243809686_pro','旧百跑 APP API','glyphicon glyphicon-th-large','pro'),('app_1553243809686_test','旧百跑 APP API','glyphicon glyphicon-th-large','test'),('app_1553243824518_dev','旧百跑微信 API','glyphicon glyphicon-th-large','dev'),('app_1553243824518_pro','旧百跑微信 API','glyphicon glyphicon-th-large','pro'),('app_1553243824518_test','旧百跑微信 API','glyphicon glyphicon-th-large','test'),('app_1553243905806_dev','旧百跑 PC 站点','glyphicon glyphicon-th-large','dev'),('app_1553243905806_pro','旧百跑 PC 站点','glyphicon glyphicon-th-large','pro'),('app_1553243905806_test','旧百跑 PC 站点','glyphicon glyphicon-th-large','test'),('app_1553244340220_dev','新百跑 Manager','glyphicon glyphicon-th-large','dev'),('app_1553244340220_pro','新百跑 Manager','glyphicon glyphicon-th-large','pro'),('app_1553244340220_test','新百跑 Manager','glyphicon glyphicon-th-large','test'),('app_1553244362852_dev','新百跑 Driverapp','glyphicon glyphicon-th-large','dev'),('app_1553244362852_pro','新百跑 Driverapp','glyphicon glyphicon-th-large','pro'),('app_1553244362852_test','新百跑 Driverapp','glyphicon glyphicon-th-large','test'),('app_1553244493244_dev','运维工具 Weibbix','glyphicon glyphicon-th-large','dev'),('app_1553244493244_pro','运维工具 Weibbix','glyphicon glyphicon-th-large','pro'),('app_1553244493244_test','运维工具 Weibbix','glyphicon glyphicon-th-large','test'),('app_1553244547692_dev','运维工具 Zabbix','glyphicon glyphicon-th-large','dev'),('app_1553244547692_pro','运维工具 Zabbix','glyphicon glyphicon-th-large','pro'),('app_1553244547692_test','运维工具 Zabbix','glyphicon glyphicon-th-large','test'),('app_1553244570068_dev','运维工具 ELK','glyphicon glyphicon-th-large','dev'),('app_1553244570068_pro','运维工具 ELK','glyphicon glyphicon-th-large','pro'),('app_1553244570068_test','运维工具 ELK','glyphicon glyphicon-th-large','test'),('app_1553244600116_dev','官网','glyphicon glyphicon-th-large','dev'),('app_1553244600116_pro','官网','glyphicon glyphicon-th-large','pro'),('app_1553244600116_test','官网','glyphicon glyphicon-th-large','test'),('app_1553244661036_dev','GPS 数据处理系统','glyphicon glyphicon-th-large','dev'),('app_1553244661036_pro','GPS 数据处理系统','glyphicon glyphicon-th-large','pro'),('app_1553244661036_test','GPS 数据处理系统','glyphicon glyphicon-th-large','test'),('app_1553478259440_dev','充电','glyphicon glyphicon-th-large','dev'),('app_1553478259440_pro','充电','glyphicon glyphicon-th-large','pro'),('app_1553478259440_test','充电','glyphicon glyphicon-th-large','test'),('app_1553506431639_dev','快点云服','glyphicon glyphicon-th-large','dev'),('app_1553506431639_pro','快点云服','glyphicon glyphicon-th-large','pro'),('app_1553506431639_test','快点云服','glyphicon glyphicon-th-large','test');
/*!40000 ALTER TABLE `tree_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_model`
--

DROP TABLE IF EXISTS `tree_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree_model` (
  `id` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `appId` varchar(255) NOT NULL,
  `clusterId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_model`
--

LOCK TABLES `tree_model` WRITE;
/*!40000 ALTER TABLE `tree_model` DISABLE KEYS */;
INSERT INTO `tree_model` VALUES ('1553248296731','nginx-web','glyphicon glyphicon-th','app_1553244362852_pro','1553248264458'),('1553248335219','nginx-web','glyphicon glyphicon-th','app_1553244340220_pro','1553248264458'),('1553249024456','nginx-proxy','glyphicon glyphicon-th','app_1553244362852_pro','1553248998680'),('1553249050888','nginx-proxy','glyphicon glyphicon-th','app_1553244340220_pro','1553248998680'),('1553249125944','nginx-proxy','glyphicon glyphicon-th','app_1553244600116_pro','1553248998680'),('1553249144824','nginx-proxy','glyphicon glyphicon-th','app_1553243809686_pro','1553248998680'),('1553249161743','nginx-proxy','glyphicon glyphicon-th','app_1553243905806_pro','1553248998680'),('1553249174711','nginx-proxy','glyphicon glyphicon-th','app_1553243824518_pro','1553248998680'),('1553479011702','java','glyphicon glyphicon-th','app_1553244661036_pro','1553478979766'),('1553480788346','kafka','glyphicon glyphicon-th','app_1553244661036_pro','1553480004099'),('1553480796698','zookeeper','glyphicon glyphicon-th','app_1553244661036_pro','1553479855524'),('1553480991881','mongodb','glyphicon glyphicon-th','app_1553244661036_pro','1553480971170'),('1553481452784','redis','glyphicon glyphicon-th','app_1553244661036_pro','1553481425760'),('1553481874358','java','glyphicon glyphicon-th','app_1553244362852_pro','1553481777070'),('1553481906078','java','glyphicon glyphicon-th','app_1553244340220_pro','1553481748295'),('1553506454047','mysql','glyphicon glyphicon-th','app_1553244362852_pro','1553506389622'),('1553506475271','mysql','glyphicon glyphicon-th','app_1553244340220_pro','1553506389622'),('1553507497100','redis','glyphicon glyphicon-th','app_1553244362852_pro','1553507465947'),('1553507507724','redis','glyphicon glyphicon-th','app_1553244340220_pro','1553507465947');
/*!40000 ALTER TABLE `tree_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userName` char(50) NOT NULL,
  `password` char(100) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (76,'admin','$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBm','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersGroup`
--

DROP TABLE IF EXISTS `usersGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersGroup` (
  `groupName` char(50) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `groupId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`groupId`),
  UNIQUE KEY `groupName` (`groupName`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersGroup`
--

LOCK TABLES `usersGroup` WRITE;
/*!40000 ALTER TABLE `usersGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `groupId` bigint(20) unsigned NOT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_users_groups_2` (`userId`),
  KEY `FK_ID` (`groupId`),
  CONSTRAINT `FK_ID` FOREIGN KEY (`groupId`) REFERENCES `usersGroup` (`groupId`),
  CONSTRAINT `c_users_groups_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups`
--

LOCK TABLES `users_groups` WRITE;
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-12  9:51:57
