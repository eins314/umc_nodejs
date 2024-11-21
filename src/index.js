// const express = require('express')  // -> CommonJS
//index.js
import cors from 'cors'; // ESM 방식
import dotenv from "dotenv";
import express from 'express';      // -> ES Module
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateReview } from "./controllers/review.controller.js"; 
import { handleChallengeMission } from './controllers/mission.controller.js';
import { handleListStoreReviews } from './controllers/store.controller.js';
import { handleCreateStore } from './controllers/store.controller.js'; 
import { getReviewById } from './controllers/user.controller.js';
import { getMissionById } from './controllers/store.controller.js';
import { getUserMissions } from './controllers/userMission.controller.js';



dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            
app.use(express.static('public'));          
app.use(express.json());                    
app.use(express.urlencoded({ extended: false })); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/users/signup", handleUserSignUp);
app.post("/reviews/add", handleCreateReview);  
app.post("/missions/:missionId/challenge",handleChallengeMission);
app.get("/stores/:storeId/reviews", handleListStoreReviews);
app.post("/stores/add", handleCreateStore);
app.get("/stores/:storeId/reviews", handleListStoreReviews);
app.get("/users/:userId/reviews", getReviewById);
app.get("/stores/:storeId/missions", getMissionById);
app.get("/usermission/:userId/challenge",getUserMissions);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})