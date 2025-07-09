import express from "express";
import { user_login , user_signup } from "../controllers/user_control";
const router = express.Router()

router.post("/login" , user_login)
router.post("/signup" , user_signup)

export default router;