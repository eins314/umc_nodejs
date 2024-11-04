CREATE DATABASE umc1;
USE umc1;

CREATE TABLE user (
id bigint primary key,
user_name varchar(10),
gender int,
birth int,
address varchar(500),
email varchar(50),
phone_number int,
user_point int,
like_food text,
user_mission text
);

create table store(
id bigint primary key,
score float,
review text,
location text,
store_mission_point bigint
);

create table mission(
id bigint primary key,
mission_name varchar(100),
description text,
reward_points int
);

DESCRIBE user;