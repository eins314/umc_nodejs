// src/controllers/store.controller.js

import { createStore } from "../repositories/store.repository.js";  
import { getMissionsByStoreId } from "../repositories/store.repository.js";  // repository에서 함수 임포트
import {StoreRequestDto} from "../dtos/store.dto.js"


export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(200).json({success:true,reviews});
};


export const handleCreateStore = async (req, res, next) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ message: "가게 이름을 제공해야 합니다." }); // 400: BAD_REQUEST
      }
  
      const store = await createStore({ name });
  
      res.status(201).json({  // 201: CREATED
        message: "가게가 성공적으로 생성되었습니다.",
        data: store,
      });
    } catch (error) {
      console.error("가게 생성 중 오류:", error);
      next(error);
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
        return res.status(400).json({ error: "유효하지 않은 가게 ID" });
      }
  
      // 레포지토리에서 미션 조회
      const missions = await getMissionsByStoreId(storeId);
  
      return res.status(200).json(missions);
    } catch (error) {
      console.error("미션 조회 중 오류:", error);
      return res.status(500).json({ error: error.message || "미션 조회 중 오류가 발생했습니다." });
    }
  };