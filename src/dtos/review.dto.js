// src/dtos/review.dto.js

export const createReviewDto = (body) => {                  //함수는 클라이언트에서 전달받은 요청 데이터를 가공하여 리뷰 데이터를 생성하는 함수
    const { storeId, userId, reviewText, score } = body;
  
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
  