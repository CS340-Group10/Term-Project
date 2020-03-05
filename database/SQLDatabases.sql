--
-- Table structure for table `sports`
--
SET FOREIGN_KEY_CHECKS=0 ;
DROP TABLE IF EXISTS `sports`;
SET FOREIGN_KEY_CHECKS=1 ;



CREATE TABLE `sports` (
  `sport_id` int(5) NOT NULL UNIQUE AUTO_INCREMENT, 
  `sport_name` varchar(255) NOT NULL,
  `professional_organization` varchar(255) NOT NULL,
  PRIMARY KEY (`sport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `team_id` int(5) NOT NULL UNIQUE AUTO_INCREMENT, 
  `team_name` varchar(255) UNIQUE NOT NULL,
  `revenue` int(20) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `sport` int UNIQUE NOT NULL,
  `active_salary_cap` double DEFAULT (0.00),
  `signed` int(3) DEFAULT (0),
  PRIMARY KEY (`team_id`),
  CONSTRAINT `sports_and_teams` FOREIGN KEY (`sport`) REFERENCES `sports` (`sport_id`)
			ON DELETE CASCADE,
  CONSTRAINT `revenue_inspect` CHECK (revenue>=0),
  CONSTRAINT `salary_inspect` CHECK (active_salary_cap>=0),
  CONSTRAINT `signed_inspect` CHECK (signed>=0)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Table structure for table `injuries`
--

SET FOREIGN_KEY_CHECKS=0 ;
DROP TABLE IF EXISTS `injuries`;
SET FOREIGN_KEY_CHECKS=1 ;

CREATE TABLE `injuries` (
  `injury_id` int(5) NOT NULL UNIQUE AUTO_INCREMENT, 
  `injury_type` varchar(255) NOT NULL,
  `injury_name` varchar(255) NOT NULL,
  `injury_notes` text,  
  PRIMARY KEY (`injury_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
--  Table structure for table `health_risks`
--

DROP TABLE IF EXISTS `health_risks`;

CREATE TABLE `health_risks` (
	`health_id` int(5) NOT NULL UNIQUE AUTO_INCREMENT,
    `injury_id` int NOT NULL,
    `sport_id` int NOT NULL,
    PRIMARY KEY (`health_id`),
    CONSTRAINT injury_key FOREIGN KEY (`injury_id`) REFERENCES `injuries` (`injury_id`),
	CONSTRAINT sport_key FOREIGN KEY (sport_id) REFERENCES `sports`(`sport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
