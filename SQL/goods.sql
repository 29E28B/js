/*
Navicat MySQL Data Transfer

Source Server         : sug
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2022-06-08 19:35:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodname` varchar(45) NOT NULL,
  `author` varchar(45) NOT NULL,
  `company` varchar(45) NOT NULL,
  `goodnumber` varchar(45) NOT NULL,
  `goodid` varchar(45) DEFAULT NULL,
  `picname` varchar(45) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `price` varchar(45) DEFAULT '00.00',
  `number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('66', '草莓', '热销水果', '草莓', '1', '1-1', '1-1.jpg', '0', '58.00', '20');
INSERT INTO `goods` VALUES ('67', '车厘子', '进口水果', '4J车厘子', '2', '2-2', '2-2.jpg', '0', '168.00', '50');
INSERT INTO `goods` VALUES ('68', '苹果', '降价水果', '红富士苹果', '3', '3-3', '3-3.jpg', '0', '10.00', '100');
INSERT INTO `goods` VALUES ('69', '菠萝', '热销水果', '大菠萝', '4', '4-4', '4-4.jpg', '0', '20.00', '9');
INSERT INTO `goods` VALUES ('70', '榴莲', '进口水果', '大榴莲', '5', '5-5', '5-5.jpg', '0', '50.00', '100');
