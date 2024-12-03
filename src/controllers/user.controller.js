import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { prisma } from "../db.config.js";


export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); 

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);

    /*
      #swagger.summary = '회원 가입 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                name: { type: "string" },
                gender: { type: "string" },
                birth: { type: "string", format: "date" },
                address: { type: "string" },
                detailAddress: { type: "string" },
                phoneNumber: { type: "string" },
                preferences: { type: "array", items: { type: "number" } }
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "회원 가입 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    name: { type: "string" },
                    preferCategory: { type: "array", items: { type: "string" } }
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "회원 가입 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string" },
                    data: { type: "object" }
                  }
                },
                success: { type: "object", nullable: true, example: null }
              }
            }
          }
        }
      };
    */
   


};

export const getReviewById = async (req,res)=>{
  try{
      const userId=parseInt(req.params.userId);

      if(isNaN(userId)){
        return res.status(StatusCodes.BAD_REQUEST).error({
          errorCode:"INVALID_USER_ID",
          reason:"유효하지 않은 유저 ID",
          });
        }
      
      const review = await prisma.review.findMany({
        where: {userId},
        include:{
          user:true,
          store:true,
        },
      });

      if(!review|| review.length===0){
        return res.status(StatusCodes.NOT_FOUND).error({
          errorCode:"NO_REVIEWS_FOUND",
          reason:"유저리뷰가 없음",
        });
      }

      return res.status(StatusCodes.OK).success(review);
      
    }catch(error){
      console.error("리뷰 조회중 오류:",error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
        errorCode:"REVIEW_FETCH_ERROR",
        reason:"리뷰 조회중 오류가 발생했습니다.",
      });
    }

    /*
      #swagger.summary = '리뷰 조회 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                "createdAt": { "type": "string", "format": "date-time"}
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
        description: "리뷰 조회 성공 응답",
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
        description: "리뷰 조회 실패 응답",
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


