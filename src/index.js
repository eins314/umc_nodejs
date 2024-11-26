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

app.use((req, res, next)=>{
  res.success = (success)=>{
    return res.json({ resultType: "success",error:null,success});
  };

  res.error = ({errorCode="unknown",reason=null,data = null})=>{
    return res.json({
      resultType: "fail",
      error:{errorCode,reason,data},
      success: null,
    });
  };
  next();
});


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
app.get("/users/:userId/reviews", getReviewById);
app.get("/stores/:storeId/missions", getMissionById);
app.get("/usermission/:userId/challenge",getUserMissions);
//app.patch("usermission/:userId/:missionId/status")



app.use((err,req,res,next)=>{
  if(res.headersSent){
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})