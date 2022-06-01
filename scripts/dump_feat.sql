-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: feat
-- ------------------------------------------------------
-- Server version	5.7.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `logitude` varchar(255) NOT NULL,
  `personId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e3d0b5ba0387be88105ad7683bb` (`personId`),
  CONSTRAINT `FK_e3d0b5ba0387be88105ad7683bb` FOREIGN KEY (`personId`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Casa','Manuel Artigas','5316','Mataderos','1440','-34.645415224925905','-58.498028272865035',1),(2,'Casa Papa','Castro Barros','2155','Aldo Bonzi','1770','-34.710966215923946','-58.510776256974765',1);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `personId` int(11) DEFAULT NULL,
  `dayId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f9930f85192c5968041cf49e16e` (`personId`),
  KEY `FK_08235582bd0f16e4eb48b191353` (`dayId`),
  CONSTRAINT `FK_08235582bd0f16e4eb48b191353` FOREIGN KEY (`dayId`) REFERENCES `day` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f9930f85192c5968041cf49e16e` FOREIGN KEY (`personId`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (1,'19:00:00','22:00:00',1,1),(2,'19:00:00','22:00:00',1,2),(3,'19:00:00','22:00:00',1,5),(4,'19:00:00','22:00:00',1,6),(5,'19:00:00','22:00:00',1,7);
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day`
--

DROP TABLE IF EXISTS `day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day`
--

LOCK TABLES `day` WRITE;
/*!40000 ALTER TABLE `day` DISABLE KEYS */;
INSERT INTO `day` VALUES (1,'Domingo'),(2,'Lunes'),(3,'Martes'),(4,'Miercoles'),(5,'Jueves '),(6,'Viernes'),(7,'Sabado');
/*!40000 ALTER TABLE `day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `description` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stateId` int(11) DEFAULT NULL,
  `sportId` int(11) DEFAULT NULL,
  `periodicityId` int(11) DEFAULT NULL,
  `organizerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c90b055c6a2553b99b725fc0e77` (`stateId`),
  KEY `FK_14126dc54792504366f3db67c28` (`sportId`),
  KEY `FK_4ea3d2a8f52781e6566278f8077` (`periodicityId`),
  KEY `FK_19642e6a244b4885e14eab0fdc0` (`organizerId`),
  CONSTRAINT `FK_14126dc54792504366f3db67c28` FOREIGN KEY (`sportId`) REFERENCES `sport` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_19642e6a244b4885e14eab0fdc0` FOREIGN KEY (`organizerId`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_4ea3d2a8f52781e6566278f8077` FOREIGN KEY (`periodicityId`) REFERENCES `periodicity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c90b055c6a2553b99b725fc0e77` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Por la Coca','2022-06-02 00:00:00','20:00:00','21:00:00','Partido para conocer gente','-34.67017455940845','-58.556484569314776','0000-00-00 00:00:00',1,1,1,1),(2,'Por la Coca Revancha','2022-06-29 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.67017455940845','-58.556484569314776','0000-00-00 00:00:00',1,1,1,1),(3,'Por la Coca Mataderos','2022-06-29 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.67017455940845','-58.556484569314776','0000-00-00 00:00:00',1,1,1,1),(16,'Prueba','2022-06-29 21:00:00','19:00:00','20:00:00','Partido de Prueba Insert','-34.67017455940845','-58.556484569314776','0000-00-00 00:00:00',1,1,1,1),(17,'Prueba 2','2022-06-02 20:00:00','19:00:00','21:00:00','Partido Amistoso de Prueba Insert','-34.67017455940845','-58.556484569314776','0000-00-00 00:00:00',1,1,1,1),(18,'Evento Sabado 28-05','2022-06-02 21:00:00','20:00:00','21:00:00','Para mostrarle al profe','-34.64222113108822','-58.490307171164346','0000-00-00 00:00:00',2,1,1,1),(19,'Picadito Sabado 4 Junio (A. Bonzi)','2022-06-04 21:00:00','20:00:00','21:00:00','Para ver si me sugiere','-34.71491851271653','-58.520387015342614','0000-00-00 00:00:00',2,1,1,1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_apply`
--

DROP TABLE IF EXISTS `event_apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origin` varchar(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stateId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `playerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5a7b15de020af3de2953d0fc229` (`stateId`),
  KEY `FK_ad23190f7bd3645c205dc4a928b` (`eventId`),
  KEY `FK_b59a73b5a1ffafd4a271f761f95` (`playerId`),
  CONSTRAINT `FK_5a7b15de020af3de2953d0fc229` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ad23190f7bd3645c205dc4a928b` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b59a73b5a1ffafd4a271f761f95` FOREIGN KEY (`playerId`) REFERENCES `player` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_apply`
--

LOCK TABLES `event_apply` WRITE;
/*!40000 ALTER TABLE `event_apply` DISABLE KEYS */;
INSERT INTO `event_apply` VALUES (1,'S','0000-00-00 00:00:00',1,1,2022),(2,'S','0000-00-00 00:00:00',2,1,2022);
/*!40000 ALTER TABLE `event_apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_suggestion`
--

DROP TABLE IF EXISTS `event_suggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_suggestion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stateId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8959c465b6973ae5632efc2623d` (`stateId`),
  KEY `FK_101080ccbeaa64463a3f7842461` (`eventId`),
  KEY `FK_7ae04b9fd779ccc9c336208a987` (`personId`),
  CONSTRAINT `FK_101080ccbeaa64463a3f7842461` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_7ae04b9fd779ccc9c336208a987` FOREIGN KEY (`personId`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_8959c465b6973ae5632efc2623d` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_suggestion`
--

LOCK TABLES `event_suggestion` WRITE;
/*!40000 ALTER TABLE `event_suggestion` DISABLE KEYS */;
INSERT INTO `event_suggestion` VALUES (1,'2022-05-30 00:00:00',12,1,1),(4,'2022-05-30 00:00:00',12,18,1),(5,'2022-05-30 00:00:00',12,19,1);
/*!40000 ALTER TABLE `event_suggestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `sportId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a5ac103647c4b264e499dac710f` (`sportId`),
  CONSTRAINT `FK_a5ac103647c4b264e499dac710f` FOREIGN KEY (`sportId`) REFERENCES `sport` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'Nivel 1',6),(2,'Nivel 1.5',6),(3,'Nivel 2',6),(4,'Nivel 2.5',6),(5,'Nivel 3',6),(6,'Nivel 3.5',6),(7,'Nivel 4',6),(8,'Nivel 4.5',6),(9,'Nivel 5',6),(10,'Nivel 5.5',6),(11,'Nivel 6',6),(12,'Nivel 7',6),(13,'Nivel 1',7),(14,'Nivel 1.5',7),(15,'Nivel 2',7),(16,'Nivel 2.5',7),(17,'Nivel 3',7),(18,'Nivel 3.5',7),(19,'Nivel 4',7),(20,'Nivel 4.5',7),(21,'Nivel 5',7),(22,'Nivel 5.5',7),(23,'Nivel 6',7),(24,'Nivel 7',7),(25,'Principiante',1),(26,'Principiante',2),(27,'Principiante',3),(28,'Principiante',4),(29,'Principiante',5),(30,'Normal',1),(31,'Normal',2),(32,'Normal',3),(33,'Normal',4),(34,'Normal',5),(35,'Bueno',1),(36,'Bueno',2),(37,'Bueno',3),(38,'Bueno',4),(39,'Bueno',5),(40,'Competitivo',1),(41,'Competitivo',2),(42,'Competitivo',3),(43,'Competitivo',4),(44,'Competitivo',5);
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodicity`
--

DROP TABLE IF EXISTS `periodicity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodicity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodicity`
--

LOCK TABLES `periodicity` WRITE;
/*!40000 ALTER TABLE `periodicity` DISABLE KEYS */;
INSERT INTO `periodicity` VALUES (1,'Unica vez'),(2,'Semanal'),(3,'Quincenal'),(4,'Mensual');
/*!40000 ALTER TABLE `periodicity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `names` varchar(255) NOT NULL,
  `birth_date` datetime NOT NULL,
  `sex` varchar(255) NOT NULL,
  `min_age` int(11) NOT NULL,
  `max_age` int(11) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `userUid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_b1cabf9628bf862dbf492c759f` (`userUid`),
  CONSTRAINT `FK_b1cabf9628bf862dbf492c759f3` FOREIGN KEY (`userUid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'Pierotti','Nahuel','1985-10-26 00:00:00','M',20,45,'npie','1');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abilities` varchar(255) NOT NULL,
  `notifications` tinyint(4) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `personId` int(11) DEFAULT NULL,
  `sportId` int(11) DEFAULT NULL,
  `positiontId` int(11) DEFAULT NULL,
  `levelId` int(11) DEFAULT NULL,
  `valuationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ddd6a52c8e63e9ed174acb5b6ab` (`personId`),
  KEY `FK_6630f1469adbbd13fa924067eee` (`sportId`),
  KEY `FK_7c09ad0aad0318df9c8b1b140f6` (`positiontId`),
  KEY `FK_91cf19db91b32504af3ac37ebb8` (`levelId`),
  KEY `FK_81b46d7d37fb12e828261620c64` (`valuationId`),
  CONSTRAINT `FK_6630f1469adbbd13fa924067eee` FOREIGN KEY (`sportId`) REFERENCES `sport` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_7c09ad0aad0318df9c8b1b140f6` FOREIGN KEY (`positiontId`) REFERENCES `position` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_81b46d7d37fb12e828261620c64` FOREIGN KEY (`valuationId`) REFERENCES `valuation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_91cf19db91b32504af3ac37ebb8` FOREIGN KEY (`levelId`) REFERENCES `level` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ddd6a52c8e63e9ed174acb5b6ab` FOREIGN KEY (`personId`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Rustico',1,'0000-00-00 00:00:00',1,1,11,1,1),(6,'Rustico',1,'0000-00-00 00:00:00',1,2,11,1,1);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_list`
--

DROP TABLE IF EXISTS `player_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origin` varchar(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stateId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `playerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_1136c9b54124c14f0e989c3b70` (`stateId`),
  UNIQUE KEY `REL_283fa9961b876764286482fd4e` (`eventId`),
  KEY `FK_72c4b394b0b95e735e8db058476` (`playerId`),
  CONSTRAINT `FK_1136c9b54124c14f0e989c3b709` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_283fa9961b876764286482fd4ef` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_72c4b394b0b95e735e8db058476` FOREIGN KEY (`playerId`) REFERENCES `player` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_list`
--

LOCK TABLES `player_list` WRITE;
/*!40000 ALTER TABLE `player_list` DISABLE KEYS */;
INSERT INTO `player_list` VALUES (1,'9','0000-00-00 00:00:00',1,2022,0);
/*!40000 ALTER TABLE `player_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_suggestion`
--

DROP TABLE IF EXISTS `player_suggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_suggestion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stateId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `playerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9487e3ac4cd014edf50c2b09f0e` (`stateId`),
  KEY `FK_6f4bcdea83dc5e2414fced42aa5` (`eventId`),
  KEY `FK_f47c04203b311027d4f844a9602` (`playerId`),
  CONSTRAINT `FK_6f4bcdea83dc5e2414fced42aa5` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_9487e3ac4cd014edf50c2b09f0e` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f47c04203b311027d4f844a9602` FOREIGN KEY (`playerId`) REFERENCES `player` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_suggestion`
--

LOCK TABLES `player_suggestion` WRITE;
/*!40000 ALTER TABLE `player_suggestion` DISABLE KEYS */;
INSERT INTO `player_suggestion` VALUES (1,'2022-06-01 00:00:00',12,19,1);
/*!40000 ALTER TABLE `player_suggestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `sportId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1cefbe23a75b700da85ac6ffd29` (`sportId`),
  CONSTRAINT `FK_1cefbe23a75b700da85ac6ffd29` FOREIGN KEY (`sportId`) REFERENCES `sport` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'Arquero',1),(2,'Arquero',2),(3,'Arquero',3),(4,'Arquero',4),(5,'Arquero',5),(6,'Defensor',1),(7,'Defensor',2),(8,'Defensor',3),(9,'Defensor',4),(10,'Defensor',5),(11,'Mediocampista',1),(12,'Mediocampista',2),(13,'Mediocampista',3),(14,'Mediocampista',4),(15,'Mediocampista',5),(16,'Delantero',1),(17,'Delantero',2),(18,'Delantero',3),(19,'Delantero',4),(20,'Delantero',5);
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sport`
--

DROP TABLE IF EXISTS `sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  `substitute` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES (1,'Futbol 5',10,2),(2,'Futbol 6',12,2),(3,'Futbol 7',14,2),(4,'Futbol 9',18,2),(5,'Futbol 11',22,2),(6,'Padel Single',2,1),(7,'Padel Doubles',4,2),(8,'Tenis Single',2,1),(9,'Tenis Doubles',4,2),(10,'Basquet ',10,2),(11,'Evento Recreativo',NULL,NULL);
/*!40000 ALTER TABLE `sport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Evento Creado'),(2,'Evento Completo'),(3,'Evento Confirmado'),(4,'Evento Cancelado'),(5,'Evento Terminado'),(6,'Solicitud Enviada'),(7,'Solicitud Confirmada'),(8,'Solicitud Rechazada'),(9,'Jugador Titular'),(10,'Jugador Suplente'),(11,'Jugador Excluido'),(12,'Sugerencia Creada'),(13,'Sugerencia Aceptada'),(14,'Sugerencia Rechazada');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `userTypeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `FK_29f29dffce2845a1abc901d4e85` (`userTypeId`),
  CONSTRAINT `FK_29f29dffce2845a1abc901d4e85` FOREIGN KEY (`userTypeId`) REFERENCES `user_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('nahuelpierotti@gmail.com','1',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'admin'),(2,'jugador'),(3,'organizador');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valuation`
--

DROP TABLE IF EXISTS `valuation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valuation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valuation`
--

LOCK TABLES `valuation` WRITE;
/*!40000 ALTER TABLE `valuation` DISABLE KEYS */;
INSERT INTO `valuation` VALUES (1,'Deporte Favorito',1),(2,'Me interesa Mucho',2),(3,'Me interesa Bastante',3),(4,'Quiero Probar Suerte',4);
/*!40000 ALTER TABLE `valuation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'feat'
--
/*!50003 DROP FUNCTION IF EXISTS `fn_calcula_distancia_por_direccion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `fn_calcula_distancia_por_direccion`(p_addressId int ,p_latitude varchar(255),p_longitude varchar(255)) RETURNS float
begin
declare v_distance float;
SELECT 
        (
            (
                (
                    acos(
                        sin(( p_latitude * pi() / 180))
                        *
                        sin(( latitude * pi() / 180)) + cos(( p_latitude * pi() /180 ))
                        *
                        cos(( latitude * pi() / 180)) * cos((( p_longitude - logitude ) * pi()/180)))
                ) * 180/pi()
            ) * 60 * 1.1515 * 1.609344
        )as distance
into v_distance
from address 
where id=p_addressId;

return v_distance;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_events_suggested_for_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_events_suggested_for_user`(IN p_userUid INT)
BEGIN
-- variables 
DECLARE done INT DEFAULT 0;
DECLARE v_dayId, v_addressId, v_personId INT;
DECLARE v_start_time, v_end_time  TIME;

-- meto la disponibilidad del usuario en un cursor
DECLARE get_availabilities CURSOR FOR 
SELECT d.id dayId,av.start_time,av.end_time,p.id personId
FROM user u 
JOIN person p ON u.uid=p.userUid
JOIN availability av ON p.id=av.personId
JOIN day d ON av.dayId=d.id
WHERE u.uid=p_userUid;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;



OPEN get_availabilities;
	
    read_loop: LOOP
		FETCH get_availabilities 
		INTO v_dayId, v_start_time, v_end_time, v_personId;
	
    IF done THEN
	 LEAVE read_loop;
	END IF;
    
    INSERT INTO event_suggestion(stateId,eventId,personId,date)
    SELECT 12 stateId, e.id,v_personId,current_date()
	FROM event e 
	JOIN sport s ON e.sportId=s.id
	WHERE e.date >= CURRENT_DATE 
    AND (s.capacity-(SELECT count(*) FROM player_list WHERE eventId=e.id AND stateId=9))>0 -- valido que el cupo > 0
	AND e.date <= DATE_ADD(NOW(), INTERVAL 10 DAY) -- filtro de eventos dentro de los 10 dias
	AND EXISTS(
		SELECT 1 FROM user u 
		JOIN person p ON u.uid=p.userUid
		JOIN player pl ON p.id=pl.personId
        JOIN address a ON p.id=a.personId
		WHERE u.uid=p_userUid
		AND pl.sportId=e.sportId
        AND fn_calcula_distancia_por_direccion(a.id,e.latitude,e.longitude) <=15 -- valida distancia a direcciones no mayor a 15 KM
	)
    AND DAYOFWEEK(DATE(e.date))=v_dayId
    AND v_start_time <= e.start_time 
    AND e.end_time <= v_end_time
    AND NOT EXISTS(
		SELECT 1 FROM event_suggestion 
        WHERE eventId=e.id 
        AND personId=v_personId 
	)
    AND NOT EXISTS(
		SELECT 1 FROM player_list  l
        JOIN player pla ON l.playerId=pla.id
        JOIN person per ON pla.personId=per.id 
        WHERE l.eventId=e.id  
	    AND per.id=v_personId
        UNION
        SELECT 1 FROM event_apply  ap
        JOIN player pla ON ap.playerId=pla.id
        JOIN person per ON pla.personId=per.id 
        WHERE ap.eventId=e.id  
	    AND per.id=v_personId
	)
    ;
    
    END LOOP read_loop;   
    
    CLOSE get_availabilities;
    
    SELECT DISTINCT * FROM event_suggestion;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_players_suggested_for_event` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_players_suggested_for_event`(IN p_eventId INT)
BEGIN
-- variables 
DECLARE done INT DEFAULT 0;
DECLARE v_sportId, v_event_day INT;
DECLARE v_event_date DATE;
DECLARE v_start_time, v_end_time  TIME;
DECLARE v_latitude,v_longitude VARCHAR(255);

SELECT sportId,date,DAYOFWEEK(DATE(date)) event_date,start_time,end_time,latitude,longitude 
INTO v_sportId,v_event_date,v_event_day,v_start_time,v_end_time,v_latitude,v_longitude
FROM event where id=p_eventId;
	
    
    INSERT INTO player_suggestion(stateId,eventId,playerId,date)
    SELECT DISTINCT 12 stateId,p_eventId,pl.id,CURRENT_DATE 
    FROM player pl
	JOIN person p ON pl.personId=p.id
	JOIN availability av ON p.id=av.personId
	JOIN day d ON av.dayId=d.id
    JOIN address a ON p.id=a.personId
	WHERE pl.sportId=v_sportId
	AND av.dayId=v_event_day 
    AND av.start_time <=v_start_time 
    AND v_end_time <= av.end_time 
    AND fn_calcula_distancia_por_direccion(a.id,v_latitude,v_longitude) <=15 -- valida distancia a direcciones no mayor a 15 KM
    AND NOT EXISTS(
		SELECT 1 FROM player_suggestion 
        WHERE eventId=p_eventId 
        AND playerId=pl.id 
	)
    AND NOT EXISTS(
		SELECT 1 FROM player_list  l
        WHERE l.eventId=p_eventId  
	    AND l.playerId=pl.id
        UNION
        SELECT 1 FROM event_apply  ap
        WHERE ap.eventId=p_eventId 
	    AND ap.playerId=pl.id
	)
    ;

SELECT * FROM player_suggestion;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-01  0:39:34
