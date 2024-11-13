// src/dtos/review.dto.js

export const createReviewDto = (body) => {
    const { storeId, userId, reviewText, score } = body;
  
    // DTO 구조 생성 및 유효성 검사
    if (!storeId || !userId || !reviewText || !score) {
      throw new Error("storeId, userId, reviewText, score는 필수 항목입니다.");
    }
  
    return {
      store_id: storeId,
      user_id: userId,
      review: reviewText,
      score: score,
    };
  };
  