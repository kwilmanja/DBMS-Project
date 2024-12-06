CREATE DATABASE  IF NOT EXISTS `stories` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stories`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: stories
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_no` varchar(10) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('Bob','bob@thebuilder.org','5557778888','yeswecan'),('DJ Khaled','khaled@msn.com','8189765252','wethebestmusic'),('Jay-Z','jay_zee@outlook.com',NULL,'queenbee'),('joe','joe@gmail.com','7203218756','world'),('Pitbull','mrworldwide@gmail.com',NULL,'notadog'),('pozboi','pozboi123@gmail.com','7205607869','hello');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `story_id` int NOT NULL,
  `text` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'joe',1,'good story'),(2,'pozboi',1,'mid story'),(3,'Jay-Z',1,'made me laugh!'),(4,'Pitbull',1,'Mr. Worldwide approves'),(5,'DJ Khaled',1,'my password is wethebestmusic'),(6,'Bob',2,'That was a close one!'),(7,'pozboi',2,'Bemo seems like a chill guy'),(8,'Jay-Z',2,'This one made me laugh too!'),(9,'Pitbull',3,'I had an octopus once...'),(10,'Jay-Z',3,'Hey guys, please help me finish this story. Much appreciated!'),(11,'DJ Khaled',3,'This story is the worst!');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `describe_prompt`
--

DROP TABLE IF EXISTS `describe_prompt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `describe_prompt` (
  `prompt_id` int NOT NULL,
  `genre` varchar(64) NOT NULL,
  PRIMARY KEY (`prompt_id`,`genre`),
  KEY `genre` (`genre`),
  CONSTRAINT `describe_prompt_ibfk_1` FOREIGN KEY (`prompt_id`) REFERENCES `prompt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `describe_prompt_ibfk_2` FOREIGN KEY (`genre`) REFERENCES `genre` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `describe_prompt`
--

LOCK TABLES `describe_prompt` WRITE;
/*!40000 ALTER TABLE `describe_prompt` DISABLE KEYS */;
INSERT INTO `describe_prompt` VALUES (1,'Adventure'),(3,'Adventure'),(4,'Adventure'),(5,'Adventure'),(6,'Adventure'),(7,'Adventure'),(8,'Adventure'),(11,'Adventure'),(8,'Comedy'),(9,'Comedy'),(10,'Comedy'),(2,'Horror'),(2,'Mystery'),(6,'Non-Fiction'),(9,'Non-fiction'),(5,'Romance'),(3,'Sci-fi'),(4,'Sci-fi'),(2,'Thriller'),(3,'Thriller'),(10,'Thriller');
/*!40000 ALTER TABLE `describe_prompt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `describe_story`
--

DROP TABLE IF EXISTS `describe_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `describe_story` (
  `story_id` int NOT NULL,
  `theme` varchar(64) NOT NULL,
  PRIMARY KEY (`story_id`,`theme`),
  KEY `theme` (`theme`),
  CONSTRAINT `describe_story_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `describe_story_ibfk_2` FOREIGN KEY (`theme`) REFERENCES `theme` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `describe_story`
--

LOCK TABLES `describe_story` WRITE;
/*!40000 ALTER TABLE `describe_story` DISABLE KEYS */;
INSERT INTO `describe_story` VALUES (2,'Coming-of-Age'),(2,'Family'),(1,'Friendship'),(3,'Good and Evil'),(2,'Survival');
/*!40000 ALTER TABLE `describe_story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `full_prompt_data`
--

DROP TABLE IF EXISTS `full_prompt_data`;
/*!50001 DROP VIEW IF EXISTS `full_prompt_data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `full_prompt_data` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `username`,
 1 AS `genres`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `full_story_data`
--

DROP TABLE IF EXISTS `full_story_data`;
/*!50001 DROP VIEW IF EXISTS `full_story_data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `full_story_data` AS SELECT 
 1 AS `story_id`,
 1 AS `title`,
 1 AS `description`,
 1 AS `username`,
 1 AS `published_date`,
 1 AS `end_passage`,
 1 AS `num_likes`,
 1 AS `themes`,
 1 AS `prompt_name`,
 1 AS `prompt_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES ('Adventure'),('Comedy'),('Horror'),('Mystery'),('Non-Fiction'),('Romance'),('Sci-fi'),('Thriller');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `username` varchar(100) NOT NULL,
  `story_id` int NOT NULL,
  PRIMARY KEY (`username`,`story_id`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('Bob',1),('DJ Khaled',1),('Jay-Z',1),('joe',1),('Pitbull',1),('pozboi',1),('joe',2),('Pitbull',2),('pozboi',2),('Bob',3);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passage`
--

DROP TABLE IF EXISTS `passage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(512) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `previous_passage` int DEFAULT NULL,
  `prompt` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `previous_passage` (`previous_passage`,`text`),
  KEY `username` (`username`),
  KEY `prompt` (`prompt`),
  CONSTRAINT `passage_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `passage_ibfk_2` FOREIGN KEY (`prompt`) REFERENCES `prompt` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `passage_ibfk_3` FOREIGN KEY (`previous_passage`) REFERENCES `passage` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passage`
--

LOCK TABLES `passage` WRITE;
/*!40000 ALTER TABLE `passage` DISABLE KEYS */;
INSERT INTO `passage` VALUES (1,'A young fish named Bemo is eager to explore the vast ocean, so he swims beyond the safety of his coral home.','joe',NULL,1),(2,'He meets a wise old sea turtle who offers to guide him through the currents.','pozboi',1,1),(3,'Caught by a sudden movement, the young fish is trapped in a net, struggling to escape.','joe',1,1),(4,'Drawn by shimmering light, the young fish discovers a glowing cave filled with hidden treasures.','Jay-Z',1,1),(5,'The turtle shares secrets of the ocean, showing how to ride currents to travel great distances.','pozboi',2,1),(6,'Using quick thinking, the young fish wiggles free and promises his dad to stay cautious in the future.','joe',3,1),(7,'A giant octopus emerges from the shadows, offering a challenge in exchange for safe passage.','Jay-Z',4,1);
/*!40000 ALTER TABLE `passage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prompt`
--

DROP TABLE IF EXISTS `prompt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prompt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` varchar(512) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `username` (`username`),
  CONSTRAINT `prompt_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prompt`
--

LOCK TABLES `prompt` WRITE;
/*!40000 ALTER TABLE `prompt` DISABLE KEYS */;
INSERT INTO `prompt` VALUES (1,'Lost in the Blue Abyss','A curious young explorer is swept away into the vast, \n    colorful depths of the ocean, where unlikely friends help navigate dangers and reunite \n    with family.','pozboi'),(2,'Echoes in the Empty Hotel','A winter caretaker and his family find themselves trapped \n    in a sprawling, isolated lodge where eerie forces and personal demons blur the line between \n    reality and madness.','pozboi'),(3,'Isle of Dinosaurs','A revolutionary wildlife sanctuary brings ancient creatures back \n    to life, but nature\'s unpredictability turns a dream into a thrilling fight for survival.','joe'),(4,'The Cosmic Traveler\'s Handbook','An ordinary human is swept into an absurd intergalactic \n    adventure, armed with a peculiar guidebook and a knack for stumbling into cosmic chaos.','joe'),(5,'The Tale of True Hearts and Peril','A daring hero, a spirited princess, and a cast of \n    quirky companions embark on a whimsical journey through danger, love, and legendary feats.','joe'),(6,'Life in the Family','A young hustler rises through the ranks of a powerful crime syndicate, \n    navigating loyalty, betrayal, and the high cost of living the good life.','joe'),(7,'The Path to Memory Creek','Four childhood friends embark on a life-changing journey to \n    uncover a secret, discovering the bonds of friendship and the weight of growing up along \n    the way.','Jay-Z'),(8,'Epic Night: The Final Countdown','Two lifelong friends set out on a chaotic quest to \n    make their last high school party unforgettable, facing hilarious mishaps and heartfelt \n    revelations along the way.','Pitbull'),(9,'Christmas Gone Haywire','A well-meaning family\'s quest for the perfect Christmas \n    spirals into chaos as unexpected guests, wild antics, and festive disasters pile up.','DJ Khaled'),(10,'Builder Bob and the Big Fix-Up','A cheerful builder and his team of talking tools tackle \n    their biggest challenge yet, proving that teamwork and determination can solve any problem.','Bob'),(11,'Critter Crew to the Rescue','A trio of pint-sized heroes springs into action, using smarts, \n    teamwork, and catchy tunes to help animals in need around the world.','Bob');
/*!40000 ALTER TABLE `prompt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story` (
  `story_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `description` varchar(512) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `published_date` datetime NOT NULL,
  `end_passage` int NOT NULL,
  PRIMARY KEY (`story_id`),
  UNIQUE KEY `end_passage` (`end_passage`),
  KEY `username` (`username`),
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`end_passage`) REFERENCES `passage` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `story_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (1,'Bemo meets a cool sea turtle','A young fish named Bemo makes an unlikely friend with a 100 year old sea turtle','pozboi','2024-12-05 22:38:27',5),(2,'Bemo escapes disaster!','Bemo is almost taken by a net, but he uses his brilliance to escape in time.','joe','2024-12-05 22:38:27',6),(3,'Octopus lol','Bemo meets an octopus. The octopus has a challenge for him (unfinished: I got writer\'s block).','Jay-Z','2024-12-05 22:38:27',7);
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theme` (
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme`
--

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` VALUES ('Coming-of-Age'),('Family'),('Friendship'),('Good and Evil'),('Love'),('Survival');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'stories'
--

--
-- Dumping routines for database 'stories'
--
/*!50003 DROP PROCEDURE IF EXISTS `build_story` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `build_story`(story_id_p int)
begin
	WITH RECURSIVE passage_tree AS (
    SELECT *
    FROM passage
    WHERE id = (select end_passage from story where story_id = story_id_p)
    UNION ALL
    SELECT p.*
    FROM passage_tree pt
    JOIN passage p 
    ON pt.previous_passage = p.id
	)
	SELECT * from passage_tree order by id;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_prompt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_prompt`(name_p varchar(128), description_p varchar(512), username_p varchar(100))
begin
	
	insert into prompt (name, description, username)
	values (name_p, description_p, username_p);

	SELECT LAST_INSERT_ID() as id;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_stories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_stories`()
begin
	select * from full_story_data;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_stories_by_prompt_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_stories_by_prompt_id`(prompt_id_p int)
begin
	select * from full_story_data
	where prompt_id = prompt_id_p;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_stories_by_username` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_stories_by_username`(username_p varchar(100))
begin
	select * from full_story_data
	where username = username_p;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_story_metadata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_story_metadata`(story_id_p int)
begin
	select * from full_story_data
	where story_id = story_id_p;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_passage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_passage`(text_p varchar(512), username_p varchar(100), 
previous_passage_p int, prompt_p int)
begin
	
	insert into passage (text, username, previous_passage, prompt)
	values (text_p, username_p, previous_passage_p, prompt_p);
	
	SELECT LAST_INSERT_ID() as id;
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `publish_story` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `publish_story`(text_p varchar(512), username_p varchar(100), 
previous_passage_p int, prompt_p int,
description_p varchar(512), title_p varchar(256)
)
begin
	
	insert into passage (text, username, previous_passage, prompt)
	values (text_p, username_p, previous_passage_p, prompt_p);

	insert into story (title, description, username, published_date, end_passage)
	values (title_p, description_p, username_p, now(), LAST_INSERT_ID());

	SELECT LAST_INSERT_ID() as id;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `full_prompt_data`
--

/*!50001 DROP VIEW IF EXISTS `full_prompt_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `full_prompt_data` AS select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`description` AS `description`,`p`.`username` AS `username`,`g`.`genres` AS `genres` from (`prompt` `p` left join (select `describe_prompt`.`prompt_id` AS `prompt_id`,group_concat(`describe_prompt`.`genre` separator ', ') AS `genres` from `describe_prompt` group by `describe_prompt`.`prompt_id`) `g` on((`g`.`prompt_id` = `p`.`id`))) group by `p`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `full_story_data`
--

/*!50001 DROP VIEW IF EXISTS `full_story_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `full_story_data` AS select `s`.`story_id` AS `story_id`,`s`.`title` AS `title`,`s`.`description` AS `description`,`s`.`username` AS `username`,`s`.`published_date` AS `published_date`,`s`.`end_passage` AS `end_passage`,sum((case when (`l`.`username` is not null) then 1 else 0 end)) AS `num_likes`,`t`.`themes` AS `themes`,`pr`.`name` AS `prompt_name`,`pr`.`id` AS `prompt_id` from ((((`story` `s` left join `likes` `l` on((`l`.`story_id` = `s`.`story_id`))) left join (select `describe_story`.`story_id` AS `story_id`,group_concat(`describe_story`.`theme` separator ', ') AS `themes` from `describe_story` group by `describe_story`.`story_id`) `t` on((`t`.`story_id` = `s`.`story_id`))) join `passage` `p` on((`p`.`id` = `s`.`end_passage`))) join `prompt` `pr` on((`pr`.`id` = `p`.`prompt`))) group by `s`.`story_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 22:43:32
