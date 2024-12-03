// src/controllers/store.controller.js

import { createStore } from "../repositories/store.repository.js";  
import { getMissionsByStoreId } from "../repositories/store.repository.js";  // repository에서 함수 임포트
import {StoreRequestDto} from "../dtos/store.dto.js"
import { INTERNAL_SERVER_ERROR, StatusCodes } from "http-status-codes";


export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      };
    */
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(200).json({ success: true, reviews });
};



export const handleCreateStore = async (req, res, next) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).error({ 
          errorCode:"NO_NAME",
          reason: "가게 이름을 제공해야 합니다." 
        }); // 400: BAD_REQUEST
      }
  
      const store = await createStore({ name });
      return res.status(StatusCodes.OK).success(store);


      /*(res.status(201).json({  // 201: CREATED
        message: "가게가 성공적으로 생성되었습니다.",
        data: store,
      });*/
    } catch (error) {
      //console.error("가게 생성 중 오류:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({ 
        errorCode:"STORE_CREATE_ERROR",
        reason:"가게생성중 오류가 발생했습니다",
      });
    }
  };
  
export const getReviewById = async (req,res)=>{
  try{
    const userId=parseInt(req.params.userId);

    if(isNaN(userId)){
      return res.status(400).json({error:"유효하지 않은 유저 ID"});
      }
     
    const review = await prisma.review.findMany({
      where: {userId},
      include:{
        user:true,
        store:true,
      },
    });

    if(!review){
      return res.status(404).json({error:"유저리뷰가 없음"});
    }

  

    return res.status(200).json(review);
    
    }catch(error){
      console.error("리뷰 조회중 오류:",error);
      return res.status(500).json({error:"리뷰 조회중 오류가 발생했습니다."});
    }
  };


  export const getMissionById = async (req, res) => {
    try {
      const storeId = parseInt(req.params.storeId);
  
      if (isNaN(storeId)) {
        return res.status(StatusCodes.BAD_GATEWAY).error({ 
          errorCode: "INVALID_STORE_ID",
          reason:"유효하지 않은 가게 ID", 
        });
      }
  
      const missions = await getMissionsByStoreId(storeId);
  
      return res.status(StatusCodes.OK).success(missions);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({ 
        errorCode: "ERROR_VIEWING_REVIEWS",
        reason: "미션 조회 중 오류가 발생했습니다.",
       });
    }

    /*
  #swagger.summary = '가게 미션 조회 API';
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    description: '조회할 가게의 ID',
    schema: { type: 'integer', example: 1 }
  };
  #swagger.responses[200] = {
    description: "가게 미션 조회 성공 응답",
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
                mission_name: { type: "string" },
                description: { type: "string" },
                rewardpoint: { type: "integer" },
                storeId: { type: "integer" }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "가게 미션 조회 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                reason: { type: "string", example: "유효하지 않은 가게 ID" },
                details: { type: "string", nullable: true, example: null }
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


