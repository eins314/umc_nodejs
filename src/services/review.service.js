import { checkStoreExists } from "../repositories/store.repository.js";  // 경로 수정
import { createReview } from "../repositories/review.repository.js";
import { ReviewAddError}  from "../errors.js";

export const addReview = async (data) => {
  const { storeId, userId, reviewText } = data;

  //가게 존재 여부 확인
  const storeExists = await checkStoreExists(storeId);
  if (!storeExists) {
    throw new ReviewAddError("존재하지 않는 가게입니다.",data);
  }

  //리뷰 추가 
  const newReview = await createReview({ storeId, userId, reviewText });
  return newReview;
};
