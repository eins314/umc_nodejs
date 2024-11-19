import { challengeMission } from "../services/mission.service.js";

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
