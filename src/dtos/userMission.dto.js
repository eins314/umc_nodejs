// src/dtos/userMission.dto.js

export class UserMissionDTO {
    constructor(userMission) {
      this.id = userMission.id;
      this.missionName = userMission.missionName;
      this.description = userMission.description;
      this.rewardPoint = userMission.rewardPoint;
      this.status = userMission.status;
      this.userId = userMission.userId;
      this.createdAt = userMission.createdAt;
      this.updatedAt = userMission.updatedAt;
      this.mission = {
        id: userMission.mission.id,
        missionName: userMission.mission.mission_name,
        description: userMission.mission.description,
        rewardPoint: userMission.mission.rewardpoint
      };
    }
  }
  
export const validateUpdateUserMissionStatusDTO = (body) => {
    const { status,userId,missionId } = body;
  
    if (![0, 1, 2].includes(status)) {
      throw new Error("Invalid status value. Allowed values are 0, 1, or 2.");
    }
  
    return { status,userId,missionId };
};
  