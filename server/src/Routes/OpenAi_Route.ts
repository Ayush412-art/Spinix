import express from 'express';
import fetchDate from "../controllers/openAi_controller";

const router = express.Router();

router.post('/chat' , fetchDate);

export default router

