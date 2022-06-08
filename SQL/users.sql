/*
Navicat MySQL Data Transfer

Source Server         : sug
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2022-06-08 19:35:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(11) NOT NULL,
  `password` varchar(45) NOT NULL DEFAULT 'admin123',
  `username` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL DEFAULT '男',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`account`) USING BTREE,
  UNIQUE KEY `idstudents_UNIQUE` (`id`) USING BTREE,
  UNIQUE KEY `account_UNIQUE` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('38', '1111111111', '11111', '李明', '男', '0', null);
INSERT INTO `users` VALUES ('39', '2222222222', '11111', '小红', '女', '0', null);
INSERT INTO `users` VALUES ('40', '3333333333', '111111', '卡丁', '男', '0', null);
INSERT INTO `users` VALUES ('41', '5555555555', '111111', '机械狗', '男', '0', null);
INSERT INTO `users` VALUES ('42', '1234567890', '123456', '预感', '女', '0', null);
INSERT INTO `users` VALUES ('45', '8888888888', '55555', '测试', '男', '0', null);
INSERT INTO `users` VALUES ('47', '9999999999', '55555', '测试2', '男', '0', null);
INSERT INTO `users` VALUES ('49', '1231231231', '12345', '你好啊', '男', '0', null);
INSERT INTO `users` VALUES ('53', '12312312312', '11111', '1123', '男', '0', 'shoppic/imgs/1654505254396_loginBac1.jpg');
INSERT INTO `users` VALUES ('54', '12332112312', '11111', '测试', '男', '0', 'shoppic/imgs/1654505498253_loginBac1.jpg');
INSERT INTO `users` VALUES ('55', '11123865736', '123456', '孙国豪', '男', '0', 'shoppic/imgs/1654662852301_head.jpg');
