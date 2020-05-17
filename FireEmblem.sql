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
VALUES ("MasterZi", "dario_zippo@hotmail.it", "SuSaNoo99", '100000'), ("SkuldMagnusdottir", "esempio@outlook.it", "AmoDario3000", '1000'); 
/* !40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item`
(
  `name` varchar(20) NOT NULL,  
  `type` varchar(20) NOT NULL,
  `value` int(11) unsigned NOT NULL DEFAULT '50',
  `cost` int(11) unsigned NOT NULL DEFAULT '100',
  PRIMARY KEY(`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;

/* !40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `item`(`name`, `type`, `value`, `cost`)
VALUES ('Spada di ferro', 'Sword', '50', '100'), ("Spada d'acciaio", 'Sword', '70', '300'), ("Spada d'argento", 'Sword', '100', '700'),
	('Ascia di ferro', 'Axe', '50', '100'), ("Ascia d'acciaio", 'Axe', '70', '300'), ("Ascia d'argento", 'Axe', '100', '700'),
    ('Lancia di ferro', 'Lance', '50', '100'), ("Lancia d'acciaio", 'Lance', '70', '300'), ("Lancia d'argento", 'Lance', '100', '700'),
    ('Armatura di ferro', 'Armor', '100', '100'), ("Armatura d'acciaio", 'Armor', '120', '300'), ("Armatura d'argento", 'Armor', '150', '700');
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
FROM inventory inv INNER JOIN item it 
	ON inv.item = it.name
WHERE inv.user = 'MasterZi';
*/
/*
SELECT *
FROM inventory;

select * from user where username='MasterZi';
*/
/*
SELECT *
FROM item;
*/