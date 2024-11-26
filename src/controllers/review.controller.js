//src/controllers/review.controller.js
import { createReview } from "../repositories/review.repository.js";
import { createReviewDto } from "../dtos/review.dto.js";
import { StatusCodes } from "http-status-codes";


//리뷰 생성 핸들러
export const handleCreateReview = async (req, res) => {
  try {
    const reviewData = createReviewDto(req.body);  

    //리뷰 생성
    const review = await createReview(reviewData);
    return res.status(StatusCodes.OK).success(review);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({ 
      errorCode:"REVIEW_CREATE_ERROR",
      reason:"리뷰생성중 오류가 발생했습니다",
    });
  }
};
