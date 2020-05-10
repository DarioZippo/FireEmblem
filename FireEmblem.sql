-- Progettazione Web 
DROP DATABASE if exists FireEmblem; 
CREATE DATABASE FireEmblem; 
USE FireEmblem; 

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `username` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `coins` int(11) unsigned NOT NULL DEFAULT '10',
  PRIMARY KEY (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user`(`username`, `email`, `password`, `coins`) 
VALUES ("MasterZi", "dario_zippo@hotmail.it", "SuSaNoo99", 0), ("SkuldMagnusdottir", "esempio@outlook.it", "AmoDario3000", 0);
