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
INSERT INTO `cluster` VALUES ('1553248264458','baipao_nginx_web_cluster','pro','nginx-web','2019-03-22 17:51:04'),('1553248998680','nginx_proxy_cluster','pro','nginx-proxy','2019-03-22 18:03:19');
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
INSERT INTO `hosts` VALUES ('38388392831175377','baipao01','172.16.1.55','pro','java','Êú∫Êàø','ZwdGacGq','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','ËôöÊãüÊú∫','172.16.2.27','',NULL,NULL,1),('38388392836648009','baipao02','172.16.1.65','pro','java','Êú∫Êàø','Ret46gRa','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','ËôöÊãüÊú∫','172.16.2.30','',NULL,NULL,1),('38388392840320783','baipao01','172.16.1.55','pro','nginx-web','Êú∫Êàø','ZwdGacGq','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','ËôöÊãüÊú∫','172.16.2.27','',NULL,NULL,1),('38388392846467727','baipao02','172.16.1.65','pro','nginx-web','Êú∫Êàø','Ret46gRa','\0','2019-03-22 09:49:36','CentOS 7','4C 8G 40G','ËôöÊãüÊú∫','172.16.2.30','',NULL,NULL,1),('38389107804771259','Server-qmeg73','172.16.1.52','pro','nginx-proxy','Êú∫Êàø','9j5NeHHz','\0','2019-03-22 10:01:31','CentOS 7','4C 8G 40G','ËôöÊãüÊú∫','172.16.2.28','',NULL,NULL,1);
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
INSERT INTO `instance` VALUES ('1553248227770','172.16.1.55','80','baipao_nginx_web_instance','/var/www/html','pro','nginx-web','','baipao_nginx_web_cluster','Êñ∞ÁôæË∑ë Manager'),('1553248227813','172.16.1.65','80','baipao_nginx_web_instance','/var/www/html','pro','nginx-web','','baipao_nginx_web_cluster','Êñ∞ÁôæË∑ë Manager'),('1553248966305','172.16.1.52','80 443','nginx_proxy01','/var/www/html','pro','nginx-proxy','','nginx_proxy_cluster','ÊóßÁôæË∑ëÂæÆ‰ø° API');
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
INSERT INTO `instance_cluster` VALUES ('1553248264514','1553248227770','1553248264458'),('1553248264536','1553248227813','1553248264458'),('1553248998724','1553248966305','1553248998680');
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
INSERT INTO `oauth_access_token` VALUES ('2019-03-22 09:18:07','0a605a8293a9ecf7502d697b989eef10','¨\Ì\0sr\0Corg.springframework.security.oauth2.common.DefaultOAuth2AccessToken≤û6$˙\Œ\0L\0additionalInformationt\0Ljava/util/Map;L\0\nexpirationt\0Ljava/util/Date;L\0refreshTokent\0?Lorg/springframework/security/oauth2/common/OAuth2RefreshToken;L\0scopet\0Ljava/util/Set;L\0	tokenTypet\0Ljava/lang/String;L\0valueq\0~\0xpsr\0java.util.Collections$EmptyMapY6ÖZ\‹\Á\–\0\0xpsr\0java.util.DatehjÅKYt\0\0xpw\0\0i©§{\»xsr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\ﬂGcù\–…∑\0L\0\nexpirationq\0~\0xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\·\ncT\‘^\0L\0valueq\0~\0xpt\0$43e4a566-3279-4260-ae58-83bd4b944f71sq\0~\0	w\0\0i©§{\»xsr\0%java.util.Collections$UnmodifiableSetÄí—èõÄU\0\0xr\0,java.util.Collections$UnmodifiableCollectionB\0Ä\À^˜\0L\0ct\0Ljava/util/Collection;xpsr\0java.util.LinkedHashSet\ÿl\◊Zï\›*\0\0xr\0java.util.HashSet∫DÖïñ∏∑4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writext\0bearert\0$08fe01a9-0d37-4475-9b9d-0c22e3ed0c81','578e2a355d165ba24732043b788db7e6','admin','test','¨\Ì\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2AuthenticationΩ@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationToken”™(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList¸%1µ\Ïé\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0Ä\À^˜\0L\0cq\0~\0xpsr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>£qiΩ\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMapÒ•®˛tıB\0L\0mq\0~\0xpsr\0java.util.HashMap\⁄¡\√`\—\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSetÄí—èõÄU\0\0xq\0~\0	sr\0java.util.LinkedHashSet\ÿl\◊Zï\›*\0\0xr\0java.util.HashSet∫DÖïñ∏∑4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0§\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4¿N\\l¿˚\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetailsÜ\‡Y/ÆY¡\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0§\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSet›òPìï\Ìá[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0§\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:ón\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigIntegerå¸ü©;˚\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.NumberÜ¨ïî\‡ã\0\0xpˇˇˇˇˇˇˇˇˇˇˇ˛ˇˇˇ˛\0\0\0ur\0[B¨Û¯T\‡\0\0xp\0\0\0Lxq\0~\0=','e9917333d93fbafb91a2fbd9cb4438bd');
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
INSERT INTO `oauth_refresh_token` VALUES ('2019-03-22 08:22:02','e9917333d93fbafb91a2fbd9cb4438bd','¨\Ì\0sr\0Lorg.springframework.security.oauth2.common.DefaultExpiringOAuth2RefreshToken/\ﬂGcù\–…∑\0L\0\nexpirationt\0Ljava/util/Date;xr\0Dorg.springframework.security.oauth2.common.DefaultOAuth2RefreshTokens\·\ncT\‘^\0L\0valuet\0Ljava/lang/String;xpt\0$43e4a566-3279-4260-ae58-83bd4b944f71sr\0java.util.DatehjÅKYt\0\0xpw\0\0i©§{\»x','¨\Ì\0sr\0Aorg.springframework.security.oauth2.provider.OAuth2AuthenticationΩ@bR\0L\0\rstoredRequestt\0<Lorg/springframework/security/oauth2/provider/OAuth2Request;L\0userAuthenticationt\02Lorg/springframework/security/core/Authentication;xr\0Gorg.springframework.security.authentication.AbstractAuthenticationToken”™(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailst\0Ljava/lang/Object;xp\0sr\0&java.util.Collections$UnmodifiableList¸%1µ\Ïé\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0Ä\À^˜\0L\0cq\0~\0xpsr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0psr\0:org.springframework.security.oauth2.provider.OAuth2Request\0\0\0\0\0\0\0\0Z\0approvedL\0authoritiesq\0~\0L\0\nextensionst\0Ljava/util/Map;L\0redirectUrit\0Ljava/lang/String;L\0refresht\0;Lorg/springframework/security/oauth2/provider/TokenRequest;L\0resourceIdst\0Ljava/util/Set;L\0\rresponseTypesq\0~\0xr\08org.springframework.security.oauth2.provider.BaseRequest6(z>£qiΩ\0L\0clientIdq\0~\0L\0requestParametersq\0~\0L\0scopeq\0~\0xpt\0testsr\0%java.util.Collections$UnmodifiableMapÒ•®˛tıB\0L\0mq\0~\0xpsr\0java.util.HashMap\⁄¡\√`\—\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0\ngrant_typet\0passwordt\0	client_idt\0testt\0scopet\0\nread writet\0usernamet\0adminxsr\0%java.util.Collections$UnmodifiableSetÄí—èõÄU\0\0xq\0~\0	sr\0java.util.LinkedHashSet\ÿl\◊Zï\›*\0\0xr\0java.util.HashSet∫DÖïñ∏∑4\0\0xpw\0\0\0?@\0\0\0\0\0t\0readt\0writexsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0?@\0\0\0\0\0\0w\0\0\0\0\0\0\0xppsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsq\0~\0$w\0\0\0?@\0\0\0\0\0\0xsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0§\0L\0credentialsq\0~\0L\0	principalq\0~\0xq\0~\0sq\0~\0sq\0~\0\0\0\0\0w\0\0\0\0xq\0~\0/sr\0java.util.LinkedHashMap4¿N\\l¿˚\0Z\0accessOrderxq\0~\0?@\0\0\0\0\0w\0\0\0\0\0\0q\0~\0q\0~\0\Zq\0~\0q\0~\0t\0\rclient_secrett\0123456q\0~\0q\0~\0q\0~\0q\0~\0 x\0psr\0-com.yunwei.weibbix.oauth.entity.MyUserDetailsÜ\‡Y/ÆY¡\0L\0usert\0 Lcom/yunwei/weibbix/entity/User;xr\02org.springframework.security.core.userdetails.User\0\0\0\0\0\0§\0Z\0accountNonExpiredZ\0accountNonLockedZ\0credentialsNonExpiredZ\0enabledL\0authoritiesq\0~\0L\0passwordq\0~\0L\0usernameq\0~\0xpsq\0~\0!sr\0java.util.TreeSet›òPìï\Ìá[\0\0xpsr\0Forg.springframework.security.core.userdetails.User$AuthorityComparator\0\0\0\0\0\0§\0\0xpw\0\0\0\0xpt\0adminsr\0com.yunwei.weibbix.entity.User^xX(:ón\0Z\0enabledL\0passwordq\0~\0L\0userIdt\0Ljava/math/BigInteger;L\0userNameq\0~\0xpt\0<$2a$10$rujM8XhL20KCln2aS9IgYuUbRDDoQKy3V3uuhvrKmwLcUtX3uRNBmsr\0java.math.BigIntegerå¸ü©;˚\0I\0bitCountI\0	bitLengthI\0firstNonzeroByteNumI\0lowestSetBitI\0signum[\0	magnitudet\0[Bxr\0java.lang.NumberÜ¨ïî\‡ã\0\0xpˇˇˇˇˇˇˇˇˇˇˇ˛ˇˇˇ˛\0\0\0ur\0[B¨Û¯T\‡\0\0xp\0\0\0Lxq\0~\0=');
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
INSERT INTO `software` VALUES ('7','apahce'),('6','iis'),('2','java'),('3','mysql'),('8','nginx-proxy'),('1','nginx-web'),('4','oracle'),('5','redis');
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
INSERT INTO `tree_app` VALUES ('app_1553243809686_dev','ÊóßÁôæË∑ë APP API','glyphicon glyphicon-th-large','dev'),('app_1553243809686_pro','ÊóßÁôæË∑ë APP API','glyphicon glyphicon-th-large','pro'),('app_1553243809686_test','ÊóßÁôæË∑ë APP API','glyphicon glyphicon-th-large','test'),('app_1553243824518_dev','ÊóßÁôæË∑ëÂæÆ‰ø° API','glyphicon glyphicon-th-large','dev'),('app_1553243824518_pro','ÊóßÁôæË∑ëÂæÆ‰ø° API','glyphicon glyphicon-th-large','pro'),('app_1553243824518_test','ÊóßÁôæË∑ëÂæÆ‰ø° API','glyphicon glyphicon-th-large','test'),('app_1553243905806_dev','ÊóßÁôæË∑ë PC Á´ôÁÇπ','glyphicon glyphicon-th-large','dev'),('app_1553243905806_pro','ÊóßÁôæË∑ë PC Á´ôÁÇπ','glyphicon glyphicon-th-large','pro'),('app_1553243905806_test','ÊóßÁôæË∑ë PC Á´ôÁÇπ','glyphicon glyphicon-th-large','test'),('app_1553244340220_dev','Êñ∞ÁôæË∑ë Manager','glyphicon glyphicon-th-large','dev'),('app_1553244340220_pro','Êñ∞ÁôæË∑ë Manager','glyphicon glyphicon-th-large','pro'),('app_1553244340220_test','Êñ∞ÁôæË∑ë Manager','glyphicon glyphicon-th-large','test'),('app_1553244362852_dev','Êñ∞ÁôæË∑ë Driverapp','glyphicon glyphicon-th-large','dev'),('app_1553244362852_pro','Êñ∞ÁôæË∑ë Driverapp','glyphicon glyphicon-th-large','pro'),('app_1553244362852_test','Êñ∞ÁôæË∑ë Driverapp','glyphicon glyphicon-th-large','test'),('app_1553244493244_dev','ËøêÁª¥Â∑•ÂÖ∑ Weibbix','glyphicon glyphicon-th-large','dev'),('app_1553244493244_pro','ËøêÁª¥Â∑•ÂÖ∑ Weibbix','glyphicon glyphicon-th-large','pro'),('app_1553244493244_test','ËøêÁª¥Â∑•ÂÖ∑ Weibbix','glyphicon glyphicon-th-large','test'),('app_1553244547692_dev','ËøêÁª¥Â∑•ÂÖ∑ Zabbix','glyphicon glyphicon-th-large','dev'),('app_1553244547692_pro','ËøêÁª¥Â∑•ÂÖ∑ Zabbix','glyphicon glyphicon-th-large','pro'),('app_1553244547692_test','ËøêÁª¥Â∑•ÂÖ∑ Zabbix','glyphicon glyphicon-th-large','test'),('app_1553244570068_dev','ËøêÁª¥Â∑•ÂÖ∑ ELK','glyphicon glyphicon-th-large','dev'),('app_1553244570068_pro','ËøêÁª¥Â∑•ÂÖ∑ ELK','glyphicon glyphicon-th-large','pro'),('app_1553244570068_test','ËøêÁª¥Â∑•ÂÖ∑ ELK','glyphicon glyphicon-th-large','test'),('app_1553244600116_dev','ÂÆòÁΩë','glyphicon glyphicon-th-large','dev'),('app_1553244600116_pro','ÂÆòÁΩë','glyphicon glyphicon-th-large','pro'),('app_1553244600116_test','ÂÆòÁΩë','glyphicon glyphicon-th-large','test'),('app_1553244661036_dev','GPS Êï∞ÊçÆÂ§ÑÁêÜÁ≥ªÁªü','glyphicon glyphicon-th-large','dev'),('app_1553244661036_pro','GPS Êï∞ÊçÆÂ§ÑÁêÜÁ≥ªÁªü','glyphicon glyphicon-th-large','pro'),('app_1553244661036_test','GPS Êï∞ÊçÆÂ§ÑÁêÜÁ≥ªÁªü','glyphicon glyphicon-th-large','test');
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
INSERT INTO `tree_model` VALUES ('1553248296731','nginx-web','glyphicon glyphicon-th','app_1553244362852_pro','1553248264458'),('1553248335219','nginx-web','glyphicon glyphicon-th','app_1553244340220_pro','1553248264458'),('1553249024456','nginx-proxy','glyphicon glyphicon-th','app_1553244362852_pro','1553248998680'),('1553249050888','nginx-proxy','glyphicon glyphicon-th','app_1553244340220_pro','1553248998680'),('1553249125944','nginx-proxy','glyphicon glyphicon-th','app_1553244600116_pro','1553248998680'),('1553249144824','nginx-proxy','glyphicon glyphicon-th','app_1553243809686_pro','1553248998680'),('1553249161743','nginx-proxy','glyphicon glyphicon-th','app_1553243905806_pro','1553248998680'),('1553249174711','nginx-proxy','glyphicon glyphicon-th','app_1553243824518_pro','1553248998680');
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

-- Dump completed on 2019-03-22 18:13:32
