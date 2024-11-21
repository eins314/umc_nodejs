// src/repositories/store.repository.js

import { prisma } from "../db.config.js";

export const checkStoreExists = async (storeId) => {
  try {
    const [rows] = await pool.query(`SELECT 1 FROM stores WHERE id = ?`, [storeId]);
    return rows.length > 0;
  } catch (error) {
    throw new Error("가게 존재 여부 확인 중 오류가 발생했습니다.");
  }
};

export const getStoreById = async (storeId) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM stores WHERE id = ?`, [storeId]);
    return rows[0] || null;
  } catch (error) {
    throw new Error("가게 정보를 가져오는 중 오류가 발생했습니다.");
  }
};

// src/repositories/store.repository.js

export const createStore = async (storeData) => {
  try {
    const newStore = await prisma.store.create({
      data: {
        name: storeData.name,
      },
    });
    return newStore;
  } catch (error) {
    console.error("가게 생성 중 오류 발생:", error);
    throw new Error("가게 생성에 실패했습니다.");
  }
};

export const listStoreReviews = async (storeId,cursor=0)=>{
  try{
    const reviews = await prisma.review.findMany({
      where:{
        storeId: storeId,
      },
      skip: cursor,
      take: 10,
    });

    return reviews;
  }catch(error){
    console.error("리뷰 찾는 중 오류",error);
    throw new Error("리뷰 찾는 중 실패 오류",error);
  }
}

export const getMissionsByStoreId = async (storeId) => {
  try {
    // storeId를 통해 해당 store와 관련된 미션들을 찾아오기
    const store = await prisma.store.findUnique({
      where: { id: storeId },  // storeId 필드를 id로 변경
      include: {
        missions: true,  // Store와 연결된 모든 미션을 포함하여 가져옴
      },
    });

    // store가 없거나 관련 미션이 없는 경우
    if (!store || store.missions.length === 0) {
      throw new Error("해당 가게의 미션을 찾을 수 없습니다.");
    }

    // 관련된 미션들 반환
    return store.missions;
  } catch (error) {
    console.error("가게 미션 조회 중 오류:", error);
    throw new Error("가게 미션 조회 중 오류가 발생했습니다.");
  }
};