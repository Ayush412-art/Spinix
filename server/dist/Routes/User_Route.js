"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_control_1 = require("../controllers/user_control");
const router = express_1.default.Router();
router.post("/login", user_control_1.user_login);
router.post("/signup", user_control_1.user_signup);
exports.default = router;
