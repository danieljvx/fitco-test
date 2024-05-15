DROP TABLE IF EXISTS `fitco_chat`.`users`;
DROP TABLE IF EXISTS `fitco_chat`.`rooms`;
DROP TABLE IF EXISTS `fitco_chat`.`messages`;

CREATE TABLE `fitco_chat`.`users` (
    `id`            INT(10) NOT NULL AUTO_INCREMENT,
    `fullname`      VARCHAR(255) DEFAULT NULL,
    `email`         VARCHAR(255) DEFAULT NULL,
    `image`         VARCHAR(255) DEFAULT NULL,
    `created_at`    TIMESTAMP DEFAULT NULL,
    `updated_at`    TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `fullname`, `email`, `image`, `created_at`, `updated_at`) VALUES (1, 'FitCo', 'fitco@fitco.com', '', NOW(), NOW());
INSERT INTO `users` (`id`, `fullname`, `email`, `image`, `created_at`, `updated_at`) VALUES (2, 'Daniel Villanueva', 'villanueva.danielx@gmail.com', '', NOW(), NOW());

CREATE TABLE `fitco_chat`.`rooms` (
    `id`            INT(10) NOT NULL AUTO_INCREMENT,
    `name`          VARCHAR(255) DEFAULT NULL,
    `status`        INT(10) DEFAULT NULL,
    `user_id`       INT(10) DEFAULT NULL,
    `created_at`    TIMESTAMP DEFAULT NULL,
    `updated_at`    TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_rooms_users_user_id_idx` (`user_id`),
    CONSTRAINT `fk_rooms_users_user_id_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO `rooms` (`id`, `name`, `status`, `user_id`, `created_at`, `updated_at`) VALUES (1, 'Room #1', 1, 1, NOW(), NOW());
INSERT INTO `rooms` (`id`, `name`, `status`, `user_id`, `created_at`, `updated_at`) VALUES (2, 'Room #2', 1, 1, NOW(), NOW());

CREATE TABLE `fitco_chat`.`messages` (
    `id`            INT(10) NOT NULL AUTO_INCREMENT,
    `text`          VARCHAR(255) DEFAULT NULL,
    `status`        INT(10) DEFAULT NULL,
    `user_id`       INT(10) DEFAULT NULL,
    `room_id`       INT(10) DEFAULT NULL,
    `created_at`    TIMESTAMP DEFAULT NULL,
    `updated_at`    TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_messages_users_user_id_idx` (`user_id`),
    CONSTRAINT `fk_messages_users_user_id_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    KEY `fk_messages_rooms_room_id_idx` (`room_id`),
    CONSTRAINT `fk_messages_rooms_room_id_idx` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO `messages` (`id`, `text`, `status`, `user_id`, `room_id`, `created_at`, `updated_at`) VALUES (1, 'Hola', 1, 1, 1, NOW(), NOW());
INSERT INTO `messages` (`id`, `text`, `status`, `user_id`, `room_id`, `created_at`, `updated_at`) VALUES (2, 'Como estas ?', 1, 1, 2, NOW(), NOW());
