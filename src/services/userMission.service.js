import { getUserMissionsByStatus } from '../repositories/userMission.repository.js';
import { UserMissionDTO } from '../dtos/userMission.dto.js';

export const getActiveUserMissions = async (userId) => {
  try {
    const userMissions = await getUserMissionsByStatus(userId, 1); // status가 1인 데이터를 가져옴
    return userMissions.map((userMission) => new UserMissionDTO(userMission)); // DTO 형식으로 변환
  } catch (error) {
    throw new Error('Service Error: ' + error.message);
  }
};
