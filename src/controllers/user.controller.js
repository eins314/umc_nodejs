import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { addReview } from "../services/review.service.js";


export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};


/*export const handleCreateReview = async (req, res) => {
  const { storeId, userId, reviewText } = req.body;
  console.log("Received data:", { storeId, userId, reviewText });

  if (!storeId || !userId || !reviewText) {
    return res.status(400).json({ error: "storeId, userId, reviewText는 필수 항목입니다." });
  }

  try {
    const review = await createReview({ storeId, userId, reviewText });
    return res.status(201).json({ message: "리뷰가 성공적으로 생성되었습니다.", review });
  } catch (error) {
    console.error("Error creating review:", error); // 에러 메시지 출력
    return res.status(500).json({ error: error.message || "리뷰 생성 중 오류가 발생했습니다." });
  }
};*/

