import { getUserMissionsByStatus } from '../repositories/userMission.repository.js';
import { UserMissionDTO } from '../dtos/userMission.dto.js';
import {GetUserChallengeError} from '../errors.js';
import {ChangeToCompleteError} from '../errors.js';

export const getActiveUserMissions = async (userId) => {
  try {
    const userMissions = await getUserMissionsByStatus(userId, 1); // status가 1인 데이터를 가져옴
    return userMissions.map((userMission) => new UserMissionDTO(userMission)); // DTO 형식으로 변환
  } catch (error) {
    throw new GetUserChallengeError("에러가 발생했습니다.",error);
  }
};

import { updateUserMissionStatusInDB } from "../repositories/userMission.repository.js";

export const updateUserMissionStatus = async (userId, missionId, status) => {
  const updated = await updateUserMissionStatusInDB(userId, missionId, status);
  if (updated.count === 0) {
    throw new ChangeToCompleteError("업데이트 할 수 없습니다.",error);
  }
  return {
    userId,missionId,updated
  };
  //return { message: "Status updated successfully." };
};
