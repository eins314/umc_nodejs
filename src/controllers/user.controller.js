import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { prisma } from "../db.config.js";


export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); 

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
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
  };


