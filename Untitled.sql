use umc1;
SELECT * FROM user;


INSERT INTO user ( user_name, gender, birth, address, email, phone_number, user_point, like_food, user_mission) 
VALUES ( '홍길동', 1, 20020202, '용인시 외대로81', 'helo@gmail.com', 01012345678, 0, '치킨', '인사하기');



SHOW DATABASES;          -- 모든 데이터베이스 보기
USE umc1;                -- umc1 데이터베이스 사용
SHOW TABLES;            -- 현재 데이터베이스의 테이블 목록 보기
DESCRIBE user;          -- user 테이블의 구조 보기
SELECT * FROM user;     -- user 테이블의 모든 데이터 조회



UPDATE user
SET 
    user_name = '홍길동',
    gender = 1,
    birth = 20020202,
    address = '용인시 외대로81',
    email = 'helo@gmail.com',
    phone_number = '01012345678',
    user_point = 0,
    like_food = '치킨',
    user_mission = '인사하기'
WHERE 
    id IN (1, 2);
