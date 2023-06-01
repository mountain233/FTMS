SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
    `id`          bigint(20)                   NOT NULL COMMENT '主键',
    `name`        varchar(32) COLLATE utf8_bin NOT NULL COMMENT '真实姓名',
    `username`    varchar(32) COLLATE utf8_bin NOT NULL COMMENT '用户名',
    `password`    varchar(64) COLLATE utf8_bin NOT NULL COMMENT '密码',
    `phone`       varchar(11) COLLATE utf8_bin NOT NULL COMMENT '手机号',
    `sex`         varchar(2) COLLATE utf8_bin  NOT NULL COMMENT '性别',
    `status`      int(11)                      NOT NULL DEFAULT '1' COMMENT '状态 0:禁用，1:正常',
    `create_time` datetime                     NOT NULL COMMENT '创建时间',
    `update_time` datetime                     NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `idx_username` (`username`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin COMMENT ='用户信息';

INSERT INTO `user`
VALUES ('1', '管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '13812312312', '1', '1', '2023-05-12 09:20:34',
        '2023-05-12 09:20:34'),
       ('2', '张三', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', '13945645678', '1', '1', '2023-05-13 10:30:50',
        '2023-05-13 10:30:50'),
       ('3', '李四', 'lisi', 'e10adc3949ba59abbe56e057f20f883e', '13678978901', '0', '1', '2023-05-14 15:40:20',
        '2023-05-14 15:40:20'),
       ('4', '王五', 'wangwu', 'e10adc3949ba59abbe56e057f20f883e', '13524682468', '0', '1', '2023-05-15 08:40:00',
        '2023-05-15 08:40:00'),
       ('5', '赵六', 'zhaoliu', 'e10adc3949ba59abbe56e057f20f883e', '13101010101', '0', '1', '2023-05-16 14:20:10',
        '2023-05-16 14:20:10'),
       ('6', '钱七', 'qianqi', 'e10adc3949ba59abbe56e057f20f883e', '13202020202', '0', '1', '2023-05-17 11:50:30',
        '2023-05-17 11:50:30'),
       ('7', '孙八', 'sunba', 'e10adc3949ba59abbe56e057f20f883e', '13303030303', '0', '1', '2023-05-18 19:15:45',
        '2023-05-18 19:15:45'),
       ('8', '周九', 'zhoujiu', 'e10adc3949ba59abbe56e057f20f883e', '13404040404', '0', '1', '2023-05-19 06:30:20',
        '2023-05-19 06:30:20'),
       ('9', '吴十', 'wushi', 'e10adc3949ba59abbe56e057f20f883e', '13505050505', '0', '1', '2023-05-20 14:55:00',
        '2023-05-20 14:55:00'),
       ('10', '陈十一', 'chenshiyi', 'e10adc3949ba59abbe56e057f20f883e', '13606060606', '0', '1', '2023-05-21 09:45:30',
        '2023-05-21 09:45:30');


-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie`
(
    `id`           bigint(20)                    NOT NULL COMMENT '主键',
    `name`         varchar(32) COLLATE utf8_bin  NOT NULL COMMENT '影片名称',
    `image`        varchar(200) COLLATE utf8_bin NOT NULL COMMENT '影片图片',
    `director`     varchar(32) COLLATE utf8_bin  NOT NULL COMMENT '导演名称',
    `introduction` varchar(256) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '剧情介绍',
    `cast`         varchar(256) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '主要演员',
    `release_date` varchar(256) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '上映日期',
    `price`        double(10, 2)                 NOT NULL COMMENT '电影价格',
    `create_time`  datetime                      NOT NULL COMMENT '创建时间',
    `update_time`  datetime                      NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `idx_username` (`name`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin COMMENT ='影片信息';

INSERT INTO `movie` (`id`, `name`, `image`, `director`, `introduction`, `cast`, `release_date`, `price`, `create_time`,
                     `update_time`)
VALUES (1, '肖申克的救赎', 'https://movie-image.com/shawshank-redemption.jpg', '弗兰克·德拉邦特',
        '本片是由弗兰克·德拉邦特执导，根据斯蒂芬·金的小说改编而来。该剧讲述了安迪（蒂姆·罗宾斯饰）在被冤枉入狱后，与朋友雷德（摩根·弗里曼饰）一起在肖申克监狱中生活，并利用自己的才智和信念最终逃脱牢狱的故事。',
        '蒂姆·罗宾斯, 摩根·弗里曼', '1994-09-23', 39.9, '2023-05-12 09:20:34', '2023-05-12 09:20:34'),
       (2, '阿甘正传', 'https://movie-image.com/forrest-gump.jpg', '罗伯特·泽米吉斯',
        '《阿甘正传》是一部由罗伯特·泽米吉斯执导，汤姆·汉克斯主演的电影。影片根据温斯顿·格卢姆的小说改编，讲述了一个智商只有75的男孩福瑞斯特·甘普在美国历史上的几十年间，通过自己的努力和乐观积极的心态获得了意想不到的成功和幸福。',
        '汤姆·汉克斯, 罗宾·怀特', '1994-07-06', 39.9, '2023-05-12 09:20:34', '2023-05-12 09:20:34'),
       (3, '盗梦空间', 'https://movie-image.com/inception.jpg', '克里斯托弗·诺兰',
        '《盗梦空间》是一部由克里斯托弗·诺兰执导的科幻电影，主演包括莱昂纳多·迪卡普里奥、艾伦·佩吉等人。影片讲述了一组梦境窃贼为了完成一次看似不可能的盗梦任务而进行的故事。',
        '莱昂纳多·迪卡普里奥, 艾伦·佩吉', '2010-07-16', 39.9, '2023-05-12 09:20:34', '2023-05-12 09:20:34'),
       (4, '泰坦尼克号', 'https://movie-image.com/titanic.jpg', '詹姆斯·卡梅隆',
        '《泰坦尼克号》是一部由詹姆斯·卡梅隆执导，莱昂纳多·迪卡普里奥、凯特·温丝莱特主演的电影。影片讲述了一对年轻恋人在泰坦尼克号号船上相遇、相爱，并在这艘船沉没时彼此不离不弃的故事。',
        '莱昂纳多·迪卡普里奥, 凯特·温丝莱特', '1997-12-19', 39.9, '2023-05-12 09:20:34', '2023-05-12 09:20:34'),
       (5, '星际穿越', 'https://movie-image.com/interstellar.jpg', '克里斯托弗·诺兰',
        '《星际穿越》是一部由克里斯托弗·诺兰执导，马修·麦康纳、安妮·海瑟薇等人出演的科幻电影。该片讲述了一组宇航员穿越虫洞进入另一个星系，寻找适合人类居住的星球，以拯救人类存亡的故事。',
        '马修·麦康纳, 安妮·海瑟薇', '2014-11-12', 39.9, '2023-05-12 09:20:34', '2023-05-12 09:20:34'),
       (6, '少年派的奇幻漂流', 'https://movie-image.com/life-of-pi.jpg', '李安',
        '《少年派的奇幻漂流》是一部由李安执导，苏拉·沙玛、伊尔凡·可汗等人主演的电影。影片改编自尤汀·马提厄的同名小说，讲述了印度少年派在海难中与一只孟加拉虎共同漂流求生的故事。',
        '苏拉·沙玛, 伊尔凡·可汗', '2012-11-22', 39.9, '2023-05-12 09:20:34', '2023-05-12 09:20:34'),
       (7, '海上钢琴师', 'https://movie-image.com/the-pianist-on-the-sea.jpg', '朱塞佩·托纳多雷',
        '《海上钢琴师》是一部由意大利导演朱塞佩·托纳多雷执导的电影，根据亚历山德罗·巴里克的同名小说改编，讲述了一个钢琴家在漂流过程中通过音乐和坚韧不拔的意志力战胜自然灾害、最终生还的故事。',
        '提米·德拉冈, 普路特·泰勒·文斯', '1998-10-28', 39.9, '2023-05-12 09:20:34', '2023-05-12 09:20:34');



-- ----------------------------
-- Table structure for purchase
-- ----------------------------
DROP TABLE IF EXISTS `purchase`;
CREATE TABLE `purchase`
(
    `id`          bigint(20) NOT NULL COMMENT '订单ID',
    `user_id`     bigint(20) NOT NULL COMMENT '用户ID',
    `movie_id`    bigint(20) NOT NULL COMMENT '电影ID',
    `quantity`    int(11)    NOT NULL DEFAULT 1 COMMENT '订单中电影数量',
    `status`      int(11)    NOT NULL DEFAULT '0' COMMENT '订单状态 0:未支付，1:已支付',
    `create_time` datetime   NOT NULL COMMENT '创建时间',
    `update_time` datetime   NOT NULL COMMENT '更新时间',
    PRIMARY KEY (id) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin COMMENT ='用户电影订单信息';

INSERT INTO `purchase` (`id`, `movie_id`, `user_id`, `quantity`, `status`, `create_time`, `update_time`)
VALUES (1, 1, 1, 2, 0, '2023-05-12 10:00:00', '2023-05-12 10:01:00'),
       (2, 2, 2, 1, 1, '2023-05-11 18:30:00', '2023-05-11 19:00:00'),
       (3, 3, 1, 1, 1, '2023-05-10 14:00:00', '2023-05-10 15:00:00'),
       (4, 4, 3, 1, 1, '2023-05-09 08:00:00', '2023-05-09 09:00:00'),
       (5, 5, 4, 3, 0, '2023-05-08 20:00:00', '2023-05-08 21:00:00'),
       (6, 6, 2, 1, 1, '2023-05-07 12:00:00', '2023-05-07 12:30:00'),
       (7, 7, 5, 2, 0, '2023-05-06 16:00:00', '2023-05-06 17:00:00');


-- ----------------------------
-- Table structure for session
-- ----------------------------
CREATE TABLE `session`
(
    `id`           bigint(20)   NOT NULL COMMENT '排片ID',
    `movie_id`     bigint(20)   NOT NULL COMMENT '电影ID',
    `room`         varchar(256) NOT NULL COMMENT '房间号',
    `time_arrange` varchar(256) NOT NULL COMMENT '时间设置安排',
    `create_time`  datetime     NOT NULL COMMENT '创建时间',
    `update_time`  datetime     NOT NULL COMMENT '更新时间',
    PRIMARY KEY (id) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin COMMENT ='影院排片';

INSERT INTO `session` (id, movie_id, room, time_arrange, create_time, update_time)
VALUES (1, 1, 'A01', '2023-05-16 09:00:00-10:00:00, 15:00:00-17:00:00, 19:00:00-21:00:00', NOW(), NOW()),
       (2, 2, 'B02', '2023-05-17 10:00:00-12:00:00, 14:00:00-16:00:00, 18:00:00-20:00:00', NOW(), NOW()),
       (3, 3, 'C03', '2023-05-18 10:00:00-12:00:00, 14:00:00-16:00:00, 18:00:00-20:00:00', NOW(), NOW()),
       (4, 4, 'D04', '2023-05-19 09:00:00-11:00:00, 13:00:00-15:00:00, 17:00:00-19:00:00', NOW(), NOW()),
       (5, 5, 'E05', '2023-05-20 12:00:00-14:00:00, 16:00:00-18:00:00, 20:00:00-22:00:00', NOW(), NOW()),
       (6, 6, 'F06', '2023-05-21 11:00:00-13:00:00, 15:00:00-17:00:00, 19:00:00-21:00:00', NOW(), NOW()),
       (7, 7, 'G07', '2023-05-22 10:00:00-12:00:00, 14:00:00-16:00:00, 18:00:00-20:00:00', NOW(), NOW());