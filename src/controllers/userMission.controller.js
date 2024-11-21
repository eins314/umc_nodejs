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

import { getActiveUserMissions } from '../services/userMission.service.js';

export const getUserMissions = async (req, res) => {
  const { userId } = req.params;  // URL에서 userId를 추출

  // userId가 없으면 에러 처리
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const userMissions = await getActiveUserMissions(userId);  // 서비스 함수 호출
    return res.json(userMissions);  // 결과를 JSON으로 반환
  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({ error: 'Service Error: ' + error.message });
  }
};
