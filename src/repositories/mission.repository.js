// src/repositories/mission.repository.js

import { pool } from "../db.config.js";

export const addMissionChallenge = async (missionId, userId) => {
  try {
    // 이미 도전 중인 미션이 있는지 확인
    const [existingChallenge] = await pool.query(
      'SELECT * FROM user_mission WHERE mission_id = ? AND user_id = ? AND status = 1',
      [missionId, userId]
    );

    // 이미 도전 중인 미션이 있으면 false 반환
    if (existingChallenge.length > 0) {
      return false;
    }

    // 도전 상태로 미션 추가 (status = 1: 실행 중)
    await pool.query(
      'INSERT INTO user_mission (mission_id, user_id, status) VALUES (?, ?, 1)',
      [missionId, userId]
    );

    return true;
  } catch (error) {
    console.error('미션 도전 처리 중 오류 발생:', error);
    throw new Error('미션 도전 처리 실패');
  }
};
