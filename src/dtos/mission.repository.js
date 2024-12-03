// src/dtos/mission.dto.js

export class ChallengeMissionRequest {
    constructor(userId) {
      this.userId = userId;
    }
  
    static from(body) {
      return new ChallengeMissionRequest(body.userId);
    }
  }
  
  export class ChallengeMissionResponse {
    constructor(missionId, status, message) {
      this.missionId = missionId;
      this.status = status;
      this.message = message;
    }
  
    static success(missionId, message = '미션에 도전 성공') {
      return new ChallengeMissionResponse(missionId, 'success', message);
    }
  
    static failure(missionId, message = '미션 도전 실패') {
      return new ChallengeMissionResponse(missionId, 'failure', message);
    }
  }
  
  export class MissionResponseDto {
    constructor(mission) {
      this.id = mission.id;
      this.missionName = mission.mission_name;
      this.description = mission.description;
      this.rewardPoint = mission.rewardpoint;
    }
  }

// src/dtos/updateMissionStatus.dto.js
export class UpdateMissionStatusDto {
  constructor(status) {
    this.status = status;
  }

  validate() {
    if (![0,1, 2].includes(this.status)) {
      throw new Error("유효하지 않은 상태값");
    }
  }
}
