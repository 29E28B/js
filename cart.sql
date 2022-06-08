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

 Date: 24/02/2022 13:54:16
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `userid` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户id',
  `goodsid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '商品id',
  `goodsnumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '商品数量'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('39', '69', '9');
INSERT INTO `cart` VALUES ('39', '66', '4');
INSERT INTO `cart` VALUES ('38', '69', '1');

SET FOREIGN_KEY_CHECKS = 1;
