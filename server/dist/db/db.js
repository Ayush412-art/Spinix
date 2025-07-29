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
exports.redisClient = exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = require("redis");
// Establishing redis connection 
const redisClient = (0, redis_1.createClient)({
    url: "redis://127.0.0.1:6379",
    socket: {
        tls: false,
        reconnectStrategy: (attempts) => Math.min(attempts * 100, 3000),
    }
});
exports.redisClient = redisClient;
redisClient.on("error", (err) => console.log("Redis connection error ❌", err));
//mongodb connection 
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = process.env.MONGO_URL;
        if (!url) {
            console.log("mongo url not found");
        }
        yield mongoose_1.default.connect(url, {
            dbName: process.env.DB_NAME
        });
        console.log("Mongodb connection established ✅ ");
    }
    catch (err) {
        console.log("Connection failed", err);
    }
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield redisClient.connect();
            console.log("Redis connections is established ✅");
        }
        catch (err) {
            console.error("Redis connection faild ❌", err);
        }
    }))();
});
exports.connection = connection;
