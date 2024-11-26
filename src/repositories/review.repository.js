// src/repositories/review.repository.js
// src/repositories/review.repository.js
import { prisma } from "../db.config.js";

export const createReview = async({ store_id, user_id, review, score }) => {
  try {
    console.log("Inserting review:", { store_id, user_id, review, score });

    const result = await prisma.review.create({
      data: {
        review,
        score,
        created_at: new Date(),
        // user를 연결 (user_id를 기준으로 기존 사용자 연결)
        user: {
          connect: { id: user_id }  // user_id에 해당하는 사용자 연결
        },
        // store를 연결 (store_id를 기준으로 기존 store 연결)
        store: {
          connect: { id: store_id }  // store_id에 해당하는 가게 연결
        }
      },
    });

    console.log("Insert result:", result);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("리뷰 생성 중 오류가 발생 했습니다.");
  }
}











/*
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
  */