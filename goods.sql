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

 Date: 24/02/2022 13:54:11
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `goodname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `author` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `company` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodnumber` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodid` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `picname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `price` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '00.00',
  `number` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (66, '草莓', '热销水果', '草莓', '1', '1-1', '1-1.jpg', 0, '58.00', '20');
INSERT INTO `goods` VALUES (67, '车厘子', '进口水果', '4J车厘子', '2', '2-2', '2-2.jpg', 0, '168.00', '50');
INSERT INTO `goods` VALUES (68, '苹果', '降价水果', '红富士苹果', '3', '3-3', '3-3.jpg', 0, '10.00', '100');
INSERT INTO `goods` VALUES (69, '菠萝', '热销水果', '大菠萝', '4', '4-4', '4-4.jpg', 0, '20.00', '9');

SET FOREIGN_KEY_CHECKS = 1;
