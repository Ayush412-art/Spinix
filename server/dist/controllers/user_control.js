"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_signup = exports.user_login = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        //checking for the username in the mongodb
        const isUser = yield User_model_1.default.findOne({ username });
        if (!isUser) {
            return res.status(404).json({ msg: "user not found ❌" });
        }
        //password checking'
        const match = yield bcrypt_1.default.compare(password, isUser.password);
        if (!match) {
            return res.status(404).json({ msg: "incorrect password " });
        }
        const secret_key = process.env.SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ username: isUser.username, role: "username" }, secret_key, {
            expiresIn: "24h",
        });
        if (token) {
            return res.status(200).json(token);
        }
    }
    catch (err) {
        console.error("Faild to login ❌ ", err);
        process.exit(1);
    }
});
exports.user_login = user_login;
const user_signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, mobile, country, city } = req.body;
    try {
        //checking for dublicasy
        const is_user = yield User_model_1.default.findOne({ username });
        if (is_user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const new_user = new User_model_1.default({
            username: username,
            password: hashedPassword,
            country: country,
            city: city,
            mobile: mobile,
        });
        yield new_user.save();
        return res.status(201).json({ msg: "user is created sucessfully" });
    }
    catch (err) {
        console.error("Faild to signup ❌ ", err);
        process.exit(1);
    }
});
exports.user_signup = user_signup;
