import { prisma } from '../db.config.js';
import { UserMissionDTO } from '../dtos/userMission.dto.js'; 



// userMission.service.js
export const getUserMissionsByStatus = async (userId, status) => {
    try {
      const userMissions = await prisma.user_mission.findMany({
        where: {
          userId: Number(userId),
          status: status,
        },
        include: {
          mission: true, 
        }
      });
      
      return userMissions.map(mission => new UserMissionDTO(mission));
    } catch (error) {
      console.error('Detailed error:', error);
      throw new Error('Error fetching missions from the database: ' + error.message);
    }
  };