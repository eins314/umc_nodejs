import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

import mysql from 'mysql2';


export const userSignUp = async (data) => {
  console.log("Received data:", data); // 전체 data 로그 확인
  console.log("Email field:", data.email); // email 필드만 로그 확인


  if (!data.email) {
    throw new Error("이메일이 전달되지 않았습니다."); // 이메일 전달 문제 확인
  }

  const preferences = Array.isArray(data.preferences) ? data.preferences : [];
  

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phone_number: data.phone_number,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }


  const user = await getUser(joinUserId);
  
  return responseFromUser({ user});
};
