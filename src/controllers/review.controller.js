// src/controllers/review.controller.js
import { createReview } from "../repositories/review.repository.js";
import { createReviewDto } from "../dtos/review.dto.js";

// 리뷰 생성 핸들러
export const handleCreateReview = async (req, res) => {
  try {
    const reviewData = createReviewDto(req.body);  // DTO 사용하여 데이터 처리

    // 리뷰 생성
    const review = await createReview(reviewData);
    return res.status(201).json({ message: "리뷰가 성공적으로 생성되었습니다.", review });
  } catch (error) {
    return res.status(400).json({ error: error.message || "리뷰 생성 중 오류가 발생했습니다." });
  }
};
