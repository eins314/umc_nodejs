import { pool } from "../db.config.js";

//미션 도전 상태로 업데이트하는 함수
export const challengeMission = async (missionId, userId) => {
  try {
    //먼저 이미 해당 미션에 도전 중인 유저가 있는지 확인
    const [existingChallenge] = await pool.query(
      `SELECT * FROM user_mission WHERE mission_id = ? AND user_id = ? AND status = 1`,  //status=1은 "실행중"을 의미
      [missionId, userId]
    );

    if (existingChallenge.length > 0) {
      throw new Error("이미 도전 중인 미션입니다.");
    }

    // 미션 상태를 "실행중(1)"으로 업데이트
    const [result] = await pool.query(
      `INSERT INTO user_mission (mission_id, user_id, status) VALUES (?, ?, 1)`, //1은 실행중 상태
      [missionId, userId]
    );

    return result; 
  } catch (error) {
    console.error("미션 도전 중 오류:", error);
    throw error; 
  }
};

// src/services/mission.service.js
import { updateMissionStatus } from "../repositories/mission.repository.js"; // Repository 함수
import { UpdateMissionStatusDto } from "../dtos/mission.repository.js"; // DTO 가져오기

export const updateMissionStatusService = async (userId, missionId, status) => {
  // 상태 DTO로 유효성 검사
  const updateMissionStatusDto = new UpdateMissionStatusDto(status);
  updateMissionStatusDto.validate();

  // 미션 상태 업데이트
  const updatedMission = await updateMissionStatus(userId, missionId, status);

  if (!updatedMission) {
    throw new Error("해당 미션을 찾을 수 없습니다.");
  }

  return updatedMission;
};
