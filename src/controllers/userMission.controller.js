// src/controllers/userMission.controller.js

/*import { getActiveUserMissions } from '../services/userMission.service.js'; // 서비스에서 데이터 가져오기

// userMission.repository.js
export const getUserMissionsByStatus = async (userId, status) => {
  try {
    const userMissions = await prisma.userMission.findMany({
      where: {
        userId: userId,
        status: status,
      },
    });
    return userMissions;
  } catch (error) {
    throw new Error('Error fetching missions from the database: ' + error.message);
  }
};*/

import { StatusCodes } from 'http-status-codes';
import { getActiveUserMissions } from '../services/userMission.service.js';

export const getUserMissions = async (req, res) => {
  const { userId } = req.params;  // URL에서 userId를 추출

  // userId가 없으면 에러 처리
  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).error({ 
      errorCode: "NOT_EXIST_USERID",
      reason:'존재하는 유저 아이디가 없습니다.', 
    });
  }

  try {
    const userMissions = await getActiveUserMissions(userId);  

    if(userMissions.length===0){
      return res.status(StatusCodes.NOT_FOUND).error({
        errorCode:"NOT_ACTIVE_MISSIONS",
        reason:"활성화된 미션이 없습니다.",
      });
    }

    return res.status(StatusCodes.OK).success(userMissions);  
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({ 
      errorCode: 'SERVICE_ERROR',
      reason:"유저의 도전중 미션 조회 중 에러발생",
    });
  }
};

import { validateUpdateUserMissionStatusDTO } from "../dtos/userMission.dto.js";
import { updateUserMissionStatus } from "../services/userMission.service.js";

export const updateUserMissionStatusHandler = async (req, res) => {
  try {
    const { userId, missionId } = req.params;
    const { status } = validateUpdateUserMissionStatusDTO(req.body);

    const result = await updateUserMissionStatus(userId, missionId, status);

    res.status(StatusCodes.OK).success(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({ 
      errorCode: "CANT_CHANGE_STATUS",
      reason:"진행완료로 바꾸는 도중 오류발생",
    });
  }
};
