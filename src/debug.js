import mysql from 'mysql2';


//const mysql = require('mysql2');

// 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'hello',
  database: 'umc1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 쿼리문과 값 설정
const query = `
  INSERT INTO user (email, user_name, gender, birth, address, detailAddress, phone_number, preferences)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  'test12@example.com',
  '엘빈',
  '남성',
  '2000-02-03',
  '주소1',
  '세부주소1',
  '010-1234-1234',
  JSON.stringify([1, 2, 5])  // 배열을 JSON 형식으로 변환
];

// 쿼리 실행
pool.query(query, values, (err, result) => {
  if (err) {
    console.error('Error inserting data:', err);
    return;
  }
  console.log('Data inserted successfully:', result);
});

