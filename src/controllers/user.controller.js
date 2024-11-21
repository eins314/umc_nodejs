import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { prisma } from "../db.config.js";


export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); 

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
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


  export const getMissionById = async (req,res)=>{
    try{
      const userId=parseInt(req.params.userId);
  
      if(isNaN(userId)){
        return res.status(400).json({error:"유효하지 않은 유저 ID"});
        }
       
      const mission = await prisma.review.findMany({
        where: {userId},
        include:{
          user:true,
          store:true,
        },
      });
  
      if(!mission){
        return res.status(404).json({error:"유저리뷰가 없음"});
      }
  
    
  
      return res.status(200).json(mission);
      
      }catch(error){
        console.error("미션 조회중 오류:",error);
        return res.status(500).json({error:"미션 조회중 오류가 발생했습니다."});
      }
    };  