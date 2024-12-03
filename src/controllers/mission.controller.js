import { challengeMission } from "../services/mission.service.js";
import { updateMissionStatus } from "../repositories/mission.repository.js"; // Repository 함수 가져오기
import { StatusCodes } from "http-status-codes";
import { updateMissionStatusService } from "../services/mission.service.js"; // 서비스 함수 가져오기



export const handleChallengeMission = async (req, res) => {
  console.log("handleChallengeMission called"); 
  const { missionId } = req.params;
  const { userId } = req.body;

  try {
    const result = await challengeMission(missionId, userId);
    return res.status(StatusCodes.OK).success(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode:"CANT_CHANGE_CHALLENGE",
      reason:"미션을 도전으로 바꾸는 중 문제가 발생했습니다.",
    });
  }

  /*
      #swagger.summary = '도전중으로 변경 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: {type: "integer"}
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "도전중으로 변경 성공 응답",
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
                  "userId": { "type": "integer" },
                }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "도전중으로 변경 실패 응답",
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
                    "reason": { "type": "string", "example": "유효하지 않은 유저아이디입니다." },
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

// src/controllers/mission.controller.js

export const handleUpdateMissionStatus = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const missionId = parseInt(req.params.missionId);
    const { status } = req.body;

    if (isNaN(userId) || isNaN(missionId)) {
      return res.status(400).json({ error: "유효하지 않은 userId 또는 missionId" });
    }

    const updatedMission = await updateMissionStatusService(userId, missionId, status);

    return res.status(200).json({
      success: true,
      message: "미션 상태가 성공적으로 업데이트되었습니다.",
      mission: updatedMission,
    });
  } catch (error) {
    console.error("미션 상태 업데이트 중 오류:", error);
    return res.status(500).json({ error: error.message || "미션 상태 업데이트 중 오류가 발생했습니다." });
  }
};
