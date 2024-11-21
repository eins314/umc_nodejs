// prisma/seed.js
import { prisma } from '../src/db.config.js'; // 확장자 포함

/*const main = async () => {
  // 예시: 미션 데이터 추가
  await prisma.mission.create({
    data: {
      mission_name: "가게 방문 미션",
      description: "가게에 방문하고 리뷰 작성하기",
      rewardpoint: 200,
      storeId: 1, // 예시: 1번 가게에 미션 추가
    },
  });

  console.log('미션이 추가되었습니다.');
};*/

/*main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  const main = async () => {
  // 예시: user_mission 데이터 추가
  await prisma.user_mission.create({
    data: {
      userId: 1, // 예시: 유저 ID
      missionId: 1, // 예시: 미션 ID
      status: 1,  // 상태 값을 1로 설정
    },
  });

  console.log('user_mission 데이터가 추가되었습니다.');
};*/

// prisma/seed.js


// 미션 데이터 추가 함수 정의
/*async function main() {
  try {
    // 예시로 미션 데이터 추가
    await prisma.store.create({
      data: {
        name: "Test Store", // 가게 이름
        missions: {
          create: [
            {
              mission_name: "미션 1",
              description: "사진찍기",
              rewardpoint: 100,
            },
            {
              mission_name: "미션 2",
              description: "리뷰 올리기",
              rewardpoint: 200,
            },
          ],
        },
      },
    });

    console.log('Seed 작업 완료');
  } catch (error) {
    console.error('Seed 작업 중 오류:', error);
  } finally {
    await prisma.$disconnect(); // Prisma 연결 종료
  }
}

// main() 함수 호출
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
});*/


const main = async () => {
  // 예시: user_mission 데이터 추가
  await prisma.user_mission.create({
    data: {
      userId: 1, // 예시: 유저 ID
      missionId: 1, // 예시: 미션 ID
      status: 1,  // 상태 값을 1로 설정
    },
  });

  console.log('user_mission 데이터가 추가되었습니다.');
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
