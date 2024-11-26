// src/repositories/mission.repository.js

import { prisma } from "../db.config.js";

export const addMissionChallenge = async(missionId, userId)=>{
  try{
    const existingChallenge = await prisma.userMission.findFirst({
      where: {
        mission_id: missionId,
        user_id: userId,
        status: 1,
      },
    });
    if(existingChallenge){
      return false;
    }

    await prisma.userMission.create({
      data:{
        mission_id:missionId,
        user_id:userId,
        status:1,
      },
    });

    return true;
  } catch(error){
    console.error("미션 도전 처리 중 오류 발생:",error);
    throw new Error("미션 처리 실패");
  }
}

export const updateMissionStatus = async (userId, missionId, status) => {
  try {
    return await prisma.mission.updateMany({
      where: {
        id: missionId,
        userId: userId,  // userId가 일치하는 미션을 찾아서 업데이트
      },
      data: {
        status,  // 미션 상태 업데이트
      },
    });
  } catch (error) {
    console.error("미션 상태 업데이트 중 오류:", error);
    throw new Error("미션 상태 업데이트 중 오류가 발생했습니다.");
  }
};


/*
export const addMissionChallenge = async (missionId, userId) => {
  try {
    //이미 도전 중인 미션이 있는지 확인
    const [existingChallenge] = await pool.query(
      'SELECT * FROM user_mission WHERE mission_id = ? AND user_id = ? AND status = 1',
      [missionId, userId]
    );

    //이미 도전 중인 미션이 있으면 false 반환
    if (existingChallenge.length > 0) {
      return false;
    }

    //도전 상태로 미션 추가 (status = 1: 실행 중)
    await pool.query(
      'INSERT INTO user_mission (mission_id, user_id, status) VALUES (?, ?, 1)',
      [missionId, userId]
    );

    return true;
  } catch (error) {
    console.error('미션 도전 처리 중 오류 발생:', error);
    throw new Error('미션 도전 처리 실패');
  }
};*/
