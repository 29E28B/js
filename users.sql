/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : shop manage

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 06/06/2022 16:55:19
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `account` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'admin123',
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '男',
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `account`) USING BTREE,
  UNIQUE INDEX `idstudents_UNIQUE`(`id`) USING BTREE,
  UNIQUE INDEX `account_UNIQUE`(`account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (38, '1111111111', '11111', '李明', '男', 0, NULL);
INSERT INTO `users` VALUES (39, '2222222222', '11111', '小红', '女', 0, NULL);
INSERT INTO `users` VALUES (40, '3333333333', '111111', '卡丁', '男', 0, NULL);
INSERT INTO `users` VALUES (41, '5555555555', '111111', '机械狗', '男', 0, NULL);
INSERT INTO `users` VALUES (42, '1234567890', '123456', '预感', '女', 0, NULL);
INSERT INTO `users` VALUES (45, '8888888888', '55555', '测试', '男', 0, NULL);
INSERT INTO `users` VALUES (47, '9999999999', '55555', '测试2', '男', 0, NULL);
INSERT INTO `users` VALUES (49, '1231231231', '12345', '你好啊', '男', 0, NULL);
INSERT INTO `users` VALUES (53, '12312312312', '11111', '1123', '男', 0, 'shoppic/imgs/1654505254396_loginBac1.jpg');
INSERT INTO `users` VALUES (54, '12332112312', '11111', '测试', '男', 0, 'shoppic/imgs/1654505498253_loginBac1.jpg');

SET FOREIGN_KEY_CHECKS = 1;
