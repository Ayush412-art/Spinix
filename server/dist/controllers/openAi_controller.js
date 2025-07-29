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
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
if (!process.env.Api_key) {
    console.log("gemini api key is missing");
}
const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.Api_key);
const fetchDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { position, startdate, enddate } = req.body;
    if (!position || !startdate || !enddate) {
        res.status(404).json({ msg: "credintials is missing" });
        return;
    }
    //setup for openai api!!
    const prompt = `plan a trip itinerary for someone going to ${position} from ${startdate} to ${enddate}. have about 3 or 4 things to do per day. respond ONLY with an array that has JSON objects with the parameters , date , eventTitle , startTime , endTime     
           `;
    try {
        const geminiModel = genAi.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        const result = yield geminiModel.generateContent(prompt);
        const response = result.response;
        console.log(response
            .text()
            .replace(/```json|```/g, "")
            .trim());
        res.status(201).send(response
            .text()
            .replace(/```json|```/g, "")
            .trim());
    }
    catch (err) {
        console.log("error occured with openAi api ", err);
        res.status(404).json({ msg: "data not found !" });
    }
});
exports.default = fetchDate;
