// src/repositories/review.repository.js
import { pool } from "../db.config.js";

export const createReview = async ({ store_id, user_id, review, score }) => {
    try {
      console.log("Inserting review:", { store_id, user_id, review, score });  // 로그로 확인
      const [result] = await pool.query(
        `INSERT INTO reviews (user_id, score, review, created_at, store_id) 
         VALUES (?, ?, ?, NOW(), ?)`,
        [user_id, score, review, store_id]
      );
      console.log('Insert result:', result);  // 쿼리 결과 출력
      return { 
        id: result.insertId, 
        user_id, 
        score, 
        review,
        store_id
      };
    } catch (error) {
      console.error('Database error:', error);  // 에러 출력
      throw new Error("리뷰 생성 중 오류가 발생했습니다.");
    }
  };
  