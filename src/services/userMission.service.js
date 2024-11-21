import { getUserMissionsByStatus } from '../repositories/userMission.repository.js';
import { UserMissionDTO } from '../dtos/userMission.dto.js';

// userId를 인자로 받아서 처리하도록 수정
export const getActiveUserMissions = async (userId) => {
  try {
    const userMissions = await getUserMissionsByStatus(userId, 1); // status가 1인 데이터를 가져옴
    return userMissions.map((userMission) => new UserMissionDTO(userMission)); // DTO 형식으로 변환
  } catch (error) {
    throw new Error('Service Error: ' + error.message);
  }
};
