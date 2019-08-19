-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: activities
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `roomID` int(11) NOT NULL,
  `RoomNumber` varchar(4) DEFAULT NULL,
  `RoomLane_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`roomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'1A',1),(2,'1B',1),(3,'1C',1),(4,'2A',1),(5,'2B',1),(6,'3A',1),(7,'3B',1),(8,'4A',1),(9,'4B',1),(10,'5A',1),(11,'5B',1),(12,'6A',1),(13,'6B',1),(14,'7A',1),(15,'7B',1),(16,'8A',1),(17,'8B',1),(18,'9A',1),(19,'9B',1),(20,'10A',1),(21,'10B',1),(22,'10C',1),(23,'10D',1),(24,'11A',1),(25,'11B',1),(26,'11C',1),(27,'11D',1),(28,'12A',2),(29,'12B',2),(30,'13A',2),(31,'13B',2),(32,'14A',2),(33,'14B',2),(34,'15A',2),(35,'15B',2),(36,'16',2),(37,'17',2),(38,'18A',2),(39,'18B',2),(40,'18C',2),(41,'19A',2),(42,'19B',2),(43,'19C',2),(44,'20A',2),(45,'20B',2),(46,'20C',2),(47,'20D',2),(48,'21A',2),(49,'21B',2),(50,'21C',2),(51,'21D',2),(52,'22A',3),(53,'22B',3),(54,'23A',3),(55,'23B',3),(56,'24A',3),(57,'24B',3),(58,'25A',3),(59,'25B',3),(60,'26A',3),(61,'26B',3),(62,'27',3),(63,'28A',3),(64,'28B',3),(65,'29A',3),(66,'29B',3),(67,'29C',3),(68,'30A',3),(69,'30B',3),(70,'30C',3),(71,'30D',3),(72,'31A',3),(73,'31B',3),(74,'31C',3),(75,'31D',3),(76,'32A',4),(77,'32B',4),(78,'33A',4),(79,'33B',4),(80,'34A',4),(81,'34B',4),(82,'35A',4),(83,'35B',4),(84,'36A',4),(85,'36B',4),(86,'37A',4),(87,'37B',4),(88,'38A',4),(89,'38B',4),(90,'39A',4),(91,'39B',4),(92,'40A',4),(93,'40B',4),(94,'40C',4),(95,'40D',4),(96,'41A',4),(97,'41B',4),(98,'41C',4),(99,'41D',4);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-19 15:03:49
