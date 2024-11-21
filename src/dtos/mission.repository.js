// src/dtos/mission.dto.js

// 미션 도전 요청 DTO
export class ChallengeMissionRequest {
    constructor(userId) {
      this.userId = userId;
    }
  
    static from(body) {
      return new ChallengeMissionRequest(body.userId);
    }
  }
  
  // 미션 도전 응답 DTO
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