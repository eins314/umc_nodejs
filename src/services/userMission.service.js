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
    /*
      #swagger.summary = '도전중인 미션 조회 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                status: {type: "integer"},
                userId: {type: "integer"},
                storeId: {type: "integer"},
                score: {type: "number",format:float},
                createdAt: {type: "string", "format": "date-time" },
                updatedAt: {type: "string", "format": "date-time"},
                missionId:{type: "integer"},
                descripton: {type: "string"}

              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "도전중인 미션조회 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  "properties": {
                  name: { type: "string" },
                  status: {type: "integer"},
                  userId: {type: "integer"},
                  storeId: {type: "integer"},
                  score: {type: "number",format:float},
                  createdAt: {type: "string", "format": "date-time" },
                  updatedAt: {type: "string", "format": "date-time"},
                  missionId:{type: "integer"},
                  descripton: {type: "string"}
                }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "도전중인 미션조회 실패 응답",
        content: {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "resultType": { "type": "string", "example": "FAIL" },
                "error": {
                  "type": "object",
                  "properties": {
                    "errorCode": { "type": "string", "example": "R001" },
                    "reason": { "type": "string", "example": "유효하지 않은 데이터입니다." },
                    "data": { "type": "object", "nullable": true }
                  }
                },
                "success": { "type": "object", "nullable": true, "example": null }
              }
            }
          }
        }
      };
    */


  
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
