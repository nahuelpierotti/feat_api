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
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Casa','Manuel Artigas','5316','Mataderos','1440','-34.645415224925905','-58.498028272865035',1),(2,'Casa Papa','Castro Barros','2155','Aldo Bonzi','1770','-34.710966215923946','-58.510776256974765',1);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `day`
--

LOCK TABLES `day` WRITE;
/*!40000 ALTER TABLE `day` DISABLE KEYS */;
INSERT INTO `day` VALUES (1,'Domingo'),(2,'Lunes'),(3,'Martes'),(4,'Miercoles'),(5,'Jueves '),(6,'Viernes'),(7,'Sabado');
/*!40000 ALTER TABLE `day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Por la Coca','2022-06-22 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.67017455940845','-58.556484569314776',1,1,1,1),(2,'Por la Coca Revancha','2022-06-29 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.67017455940845','-58.556484569314776',1,1,1,1),(3,'Por la Coca Mataderos','2022-06-29 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.67017455940845','-58.556484569314776',1,1,1,1),(16,'Prueba','2022-05-29 21:00:00','19:00:00','20:00:00','Partido de Prueba Insert','-34.67017455940845','-58.556484569314776',1,1,1,1),(17,'Prueba 2','2022-06-02 21:00:00','19:00:00','21:00:00','Partido Amistoso de Prueba Insert','-34.67017455940845','-58.556484569314776',1,1,1,1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `event_apply`
--

LOCK TABLES `event_apply` WRITE;
/*!40000 ALTER TABLE `event_apply` DISABLE KEYS */;
INSERT INTO `event_apply` VALUES (1,'S',6,1,1),(2,'S',6,2,1);
/*!40000 ALTER TABLE `event_apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'Nivel 1',6),(2,'Nivel 1.5',6),(3,'Nivel 2',6),(4,'Nivel 2.5',6),(5,'Nivel 3',6),(6,'Nivel 3.5',6),(7,'Nivel 4',6),(8,'Nivel 4.5',6),(9,'Nivel 5',6),(10,'Nivel 5.5',6),(11,'Nivel 6',6),(12,'Nivel 7',6),(13,'Nivel 1',7),(14,'Nivel 1.5',7),(15,'Nivel 2',7),(16,'Nivel 2.5',7),(17,'Nivel 3',7),(18,'Nivel 3.5',7),(19,'Nivel 4',7),(20,'Nivel 4.5',7),(21,'Nivel 5',7),(22,'Nivel 5.5',7),(23,'Nivel 6',7),(24,'Nivel 7',7),(25,'Principiante',1),(26,'Principiante',2),(27,'Principiante',3),(28,'Principiante',4),(29,'Principiante',5),(30,'Normal',1),(31,'Normal',2),(32,'Normal',3),(33,'Normal',4),(34,'Normal',5),(35,'Bueno',1),(36,'Bueno',2),(37,'Bueno',3),(38,'Bueno',4),(39,'Bueno',5),(40,'Competitivo',1),(41,'Competitivo',2),(42,'Competitivo',3),(43,'Competitivo',4),(44,'Competitivo',5);
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodicity`
--

LOCK TABLES `periodicity` WRITE;
/*!40000 ALTER TABLE `periodicity` DISABLE KEYS */;
INSERT INTO `periodicity` VALUES (1,'Unica vez'),(2,'Semanal'),(3,'Quincenal'),(4,'Mensual');
/*!40000 ALTER TABLE `periodicity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'Pierotti','Nahuel','1985-10-26 00:00:00','M',20,45,'npie',1);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Rustico',1,1,1,11,30,1),(6,'Rustico',1,1,2,11,30,1);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `player_list`
--

LOCK TABLES `player_list` WRITE;
/*!40000 ALTER TABLE `player_list` DISABLE KEYS */;
INSERT INTO `player_list` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `player_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'Arquero',1),(2,'Arquero',2),(3,'Arquero',3),(4,'Arquero',4),(5,'Arquero',5),(6,'Defensor',1),(7,'Defensor',2),(8,'Defensor',3),(9,'Defensor',4),(10,'Defensor',5),(11,'Mediocampista',1),(12,'Mediocampista',2),(13,'Mediocampista',3),(14,'Mediocampista',4),(15,'Mediocampista',5),(16,'Delantero',1),(17,'Delantero',2),(18,'Delantero',3),(19,'Delantero',4),(20,'Delantero',5);
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES (1,'Futbol 5',10,2),(2,'Futbol 6',12,2),(3,'Futbol 7',14,2),(4,'Futbol 9',18,2),(5,'Futbol 11',22,2),(6,'Padel Single',2,1),(7,'Padel Doubles',4,2),(8,'Tenis Single',2,1),(9,'Tenis Doubles',4,2),(10,'Basquet ',10,2),(11,'Evento Recreativo',NULL,NULL);
/*!40000 ALTER TABLE `sport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Evento Creado'),(2,'Evento Completo'),(3,'Evento Confirmado'),(4,'Evento Cancelado'),(5,'Evento Terminado'),(6,'Solicitud Enviada'),(7,'Solicitud Confirmada'),(8,'Solicitud Rechazada');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nahuelpierotti@gmail.com',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'admin'),(2,'jugador'),(3,'organizador');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `valuation`
--

LOCK TABLES `valuation` WRITE;
/*!40000 ALTER TABLE `valuation` DISABLE KEYS */;
INSERT INTO `valuation` VALUES (1,'Deporte Favorito',1),(2,'Me interesa Mucho',2),(3,'Me interesa Bastante',3),(4,'Quiero Probar Suerte',4);
/*!40000 ALTER TABLE `valuation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-28 13:21:45
