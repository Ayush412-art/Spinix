"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
const Rooms_Route_1 = __importDefault(require("../src/Routes/Rooms_Route"));
const User_Route_1 = __importDefault(require("../src/Routes/User_Route"));
const BookRooms_Route_1 = __importDefault(require("../src/Routes/BookRooms_Route"));
const OpenAi_Route_1 = __importDefault(require("../src/Routes/OpenAi_Route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config();
(0, db_1.connection)();
//Routes 
app.use(express_1.default.json());
app.use("/api", BookRooms_Route_1.default);
app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.use("/admin", Rooms_Route_1.default);
app.use("/users", User_Route_1.default);
app.use("/openai", OpenAi_Route_1.default);
app.listen("5055", () => {
    console.log("server is running at port 5055");
});
