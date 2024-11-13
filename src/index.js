// const express = require('express')  // -> CommonJS
//index.js

import cors from 'cors'; // ESM 방식
import dotenv from "dotenv";
import express from 'express';      // -> ES Module
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateReview } from "./controllers/review.controller.js"; // 리뷰 컨트롤러 임포트
import { handleChallengeMission } from './controllers/mission.controller.js';



dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/users/signup", handleUserSignUp);
app.post("/reviews", handleCreateReview);  // 리뷰 생성 API는 handleCreateReview로 연결ap
app.post("/missions/:missionId/challenge",handleChallengeMission);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})