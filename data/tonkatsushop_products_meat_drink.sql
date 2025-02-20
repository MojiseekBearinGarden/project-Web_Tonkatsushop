-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: tonkatsushop
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `products_meat_drink`
--

DROP TABLE IF EXISTS `products_meat_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_meat_drink` (
  `name_products` varchar(100) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `meat_1` varchar(100) DEFAULT 'no',
  `meat_2` varchar(100) DEFAULT 'no',
  PRIMARY KEY (`name_products`),
  CONSTRAINT `name_products` FOREIGN KEY (`name_products`) REFERENCES `products` (`name_products`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_meat_drink`
--

LOCK TABLES `products_meat_drink` WRITE;
/*!40000 ALTER TABLE `products_meat_drink` DISABLE KEYS */;
INSERT INTO `products_meat_drink` VALUES ('Chicken Tonkatsu + rice Topped with egg',115.00,'chicken','egg'),('Chicken Tonkatsu + rice Topped with sauce',115.00,'chicken','no'),('Mineral water',15.00,'no','no'),('Pork Tonkatsu + rice Topped with egg',135.00,'pork','egg'),('Pork Tonkatsu + rice Topped with sauce',135.00,'pork','no'),('Soft drink',20.00,'no','no');
/*!40000 ALTER TABLE `products_meat_drink` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-08 22:31:46
