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
      /*
      #swagger.summary = '리뷰 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                review: {type: "string"},
                userId: {type: "integer"},
                storeId: {type: "integer"},
                score: {type: "number",format:float}
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "리뷰 작성 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  "properties": {
                  "reviewId": { "type": "integer" },
                  "userId": { "type": "integer" },
                  "storeId": { "type": "integer" },
                  "score": { "type": "number", "format": "float" },
                  "review": { "type": "string" },
                  "createdAt": { "type": "string", "format": "date-time" }
                }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "리뷰 작성 실패 응답",
        content: {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "resultType": { "type": "string", "example": "FAIL" },
                "error": {
                  "type": "object",
                  "properties": {
                    "errorCode": { "type": "string", "example": "R001" },
                    "reason": { "type": "string", "example": "유효하지 않은 데이터입니다." },
                    "data": { "type": "object", "nullable": true }
                  }
                },
                "success": { "type": "object", "nullable": true, "example": null }
              }
            }
          }
        }
      };
    */


};
