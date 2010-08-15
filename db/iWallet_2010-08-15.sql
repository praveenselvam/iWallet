# Sequel Pro dump
# Version 2492
# http://code.google.com/p/sequel-pro
#
# Host: 127.0.0.1 (MySQL 5.1.49)
# Database: iWallet
# Generation Time: 2010-08-15 13:55:10 +0530
# ************************************************************

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ExpenseItems
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ExpenseItems`;

CREATE TABLE `ExpenseItems` (
  `eitem_id` bigint(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `eitem_desc` text NOT NULL,
  `eitem_price` int(11) NOT NULL DEFAULT '0',
  `eitem_sharing` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`eitem_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `expenseitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

LOCK TABLES `ExpenseItems` WRITE;
/*!40000 ALTER TABLE `ExpenseItems` DISABLE KEYS */;
INSERT INTO `ExpenseItems` (`eitem_id`,`user_id`,`eitem_desc`,`eitem_price`,`eitem_sharing`)
VALUES
	(2,1,'Pizzas',200,1),
	(3,1,'Oranges',50,1);

/*!40000 ALTER TABLE `ExpenseItems` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `user_id` bigint(11) NOT NULL AUTO_INCREMENT,
  `user_email` text NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` (`user_id`,`user_email`)
VALUES
	(1,'praveen.selvam@gmail.com'),
	(2,'praveen.selvam@thoughtworks.com');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;





/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
