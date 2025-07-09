
import { Request , Response } from "express";
import {GoogleGenerativeAI} from "@google/generative-ai"

const Api_key : any = "AIzaSyDrRjGqiJtRAo2JqJ1rXvVk8LcWtfK4420"
const genAi  = new GoogleGenerativeAI(Api_key)

const fetchDate = async(req : Request  , res : Response) : Promise<void> =>{
        const {position , startdate , enddate} = req.body;

      if(!position || !startdate || !enddate){
        res.status(404).json({msg : "credintials is missing"})
        return;
      }

            //setup for openai api!!

            const prompt = `plan a trip itinerary for someone going to ${position} from ${startdate} to ${enddate}. have about 3 or 4 things to do per day. respond ONLY with an array that has JSON objects with the parameters , date , eventTitle , startTimem , endTime     
           `
          try{
                const geminiModel = genAi.getGenerativeModel({
                model: "gemini-2.5-flash",
                });
                 const result = await geminiModel.generateContent(prompt);
                    const response = result.response;
                   
                   
                    console.log(response.text().replace(/```json|```/g, "").trim());
                    
                    res.status(201).send(response.text().replace(/```json|```/g, "").trim());
            }
    catch(err){
            console.log("error occured with openAi api " , err)
            res.status(404).json({msg : 'data not found !'})
        }
    
}

export default fetchDate;
