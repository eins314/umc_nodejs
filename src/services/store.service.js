import { getStoreById } from "../repositories/store.repository.js";
import { getMissionsByStoreId } from "../repositories/store.repository.js"; 

const checkStoreExists = async (storeId) => {
  const store = await getStoreById(storeId);
  return store !== null;
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

export const getMissions = async (storeId) => {
  try {
    // storeId로 미션들 조회
    const missions = await getMissionsByStoreId(storeId);

    return missions;
  } catch (error) {
    throw new Error("미션 조회 중 오류가 발생했습니다.");
  }
};