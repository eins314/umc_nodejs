import { challengeMission } from "../services/mission.service.js";
import { updateMissionStatus } from "../repositories/mission.repository.js"; // Repository 함수 가져오기


export const handleChallengeMission = async (req, res) => {
  console.log("handleChallengeMission called"); 
  const { missionId } = req.params;
  const { userId } = req.body;

  try {
    const result = await challengeMission(missionId, userId);
    res.status(200).json({ message: "Mission challenge started.", result });
  } catch (error) {
    console.error("Error in handleChallengeMission:", error);
    res.status(500).json({ error: error.message || "Mission challenge failed." });
  }
};

// src/controllers/mission.controller.js
import { updateMissionStatusService } from "../services/mission.service.js"; // 서비스 함수 가져오기

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
