-- Progettazione Web 
DROP DATABASE if exists FireEmblem; 
CREATE DATABASE FireEmblem; 
USE FireEmblem; 

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `username` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `coins` int(11) unsigned NOT NULL DEFAULT '10',
  PRIMARY KEY (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie`
--

LOCK TABLES `user` WRITE;

/* !40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`/*(`username`, `email`, `password`)*/
VALUES ("MasterZi", "dario_zippo@hotmail.it", "SuSaNoo99", '1000'), ("SkuldMagnusdottir", "esempio@outlook.it", "AmoDario3000", '1000'); 
/* !40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item`
(
  `name` varchar(20) NOT NULL,  
  `type` varchar(20) NOT NULL,
  `cost` int(11) unsigned NOT NULL DEFAULT '100',
  PRIMARY KEY(`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;

/* !40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `item`
VALUES ('Spada di ferro', 'Spada', '100'), ("Spada d'acciaio", 'Spada', '300'), ("Spada d'argento", 'Spada', '700'),
	('Ascia di ferro', 'Ascia', '100'), ("Ascia d'acciaio", 'Ascia', '300'), ("Ascia d'argento", 'Ascia', '700'),
    ('Lancia di ferro', 'Lancia', '100'), ("Lancia d'acciaio", 'Lancia', '300'), ("Lancia d'argento", 'Lancia', '700'),
    ('Armatura di ferro', 'Armatura', '100'), ("Armatura d'acciaio", 'Armatura', '300'), ("Armatura d'argento", 'Armatura', '700');
/* !40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` 
(
  `user` varchar(20) NOT NULL
    REFERENCES `user`(`username`),
  `item` varchar(20) NOT NULL
    REFERENCES `item`(`name`),
  PRIMARY KEY (`user`, `item`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

DROP PROCEDURE IF EXISTS Populate;

DELIMITER $$
CREATE PROCEDURE Populate()
BEGIN
	DECLARE ended INT DEFAULT 0;
    DECLARE currentUser VARCHAR(20);
    
	DECLARE C CURSOR FOR
		SELECT username
        FROM `User`;
        
	DECLARE CONTINUE HANDLER
		FOR NOT FOUND SET ended = 1;
	
    OPEN C;
    
    insertRecords: LOOP 
		FETCH C INTO currentUser;
        
        IF ended = 1 THEN
			LEAVE insertRecords;
        END IF;
        
        INSERT INTO inventory
		    	VALUES(currentUser, "Spada di ferro"), (currentUser, "Lancia di ferro"), (currentUser, "Ascia di ferro"), (currentUser, "Armatura di ferro");
    END LOOP insertRecords;
	CLOSE C;
END $$

DELIMITER ;

CALL Populate();
/*
SELECT *
FROM inventory;

select * from user where username='MasterZi';
*/
/*
SELECT *
FROM item;
*/