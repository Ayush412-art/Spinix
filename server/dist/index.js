"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
const Rooms_Route_1 = __importDefault(require("../src/Routes/Rooms_Route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)().then(() => {
    console.log("db connected sucessfully");
})
    .catch(() => {
    console.log("error occured");
});
app.use(express_1.default.json());
app.use("/admin", Rooms_Route_1.default);
app.listen("8000", () => {
    console.log("server is running at port 8000");
});
