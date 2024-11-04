CREATE DATABASE umc1;
USE umc1;

CREATE TABLE user (
    id BIGINT PRIMARY KEY,
    user_name VARCHAR(10),
    gender INT,
    birth INT,
    address VARCHAR(500),
    email VARCHAR(50),
    phone_number VARCHAR(15), -- 전화번호를 문자열로 변경
    user_point INT,
    like_food TEXT,
    user_mission TEXT
);

CREATE TABLE store (
    id BIGINT PRIMARY KEY,
    score FLOAT,
    review TEXT,
    location TEXT,
    store_mission_point BIGINT -- BIGINT로 유지
);

CREATE TABLE mission (
    id BIGINT PRIMARY KEY, -- mission의 기본 키
    mission_name VARCHAR(100),
    description TEXT,
    reward_points INT
);

-- user와 mission의 관계를 정의하는 테이블
CREATE TABLE user_mission (
    user_id BIGINT,
    mission_id BIGINT,
    PRIMARY KEY(user_id, mission_id), -- 복합 기본 키
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(mission_id) REFERENCES mission(id)
);


INSERT INTO user (id, user_name, gender, birth, address, email, phone_number, user_point, like_food, user_mission)
VALUES 
(1, 'Alice', 1, 1990, 'Seoul', 'alice@example.com', '010-1234-5678', 100, 'Pizza', 'Complete the first mission'),
(2, 'Bob', 0, 1985, 'Busan', 'bob@example.com', '010-9876-5432', 150, 'Sushi', 'Complete the second mission');

-- store 테이블에 데이터 삽입
INSERT INTO store (id, score, review, location, store_mission_point)
VALUES 
(1, 4.5, 'Great food!', 'Gangnam', 50),
(2, 4.0, 'Good service!', 'Hongdae', 40);

-- mission 테이블에 데이터 삽입
INSERT INTO mission (id, mission_name, description, reward_points)
VALUES 
(1, 'First Mission', 'Complete your profile.', 10),
(2, 'Second Mission', 'Refer a friend.', 20);

-- user_mission 테이블에 데이터 삽입
INSERT INTO user_mission (user_id, mission_id)
VALUES 
(1, 1),
(2, 2);


-- user 테이블 데이터 조회
SELECT * FROM user;

-- store 테이블 데이터 조회
SELECT * FROM store;

-- mission 테이블 데이터 조회
SELECT * FROM mission;

-- user_mission 테이블 데이터 조회
SELECT * FROM user_mission;
