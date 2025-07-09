import {Request , Response} from 'express'
import user from '../models/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const user_login = async(req : Request , res : Response) : Promise<any> =>{

                const {username , password} = req.body;
            try{
                //checking for the username in the mongodb
                const isUser = await user.findOne({username});
                
                if(!isUser){
                    return res.status(404).json({msg : "user not found ❌"})
                }
                 //password checking'
                 const match = await bcrypt.compare(password , isUser.password)   

                 if(!match){
                        return res.status(404).json({msg : "incorrect password "})
                 }
                const secret_key : any  = process.env.SECRET_KEY;

                 const token : string = jwt.sign({username : isUser.username  , role : "username"} , 
                    secret_key , 
                    {
                        expiresIn : '24h'
                    }
                 )
                 if(token){
                    return res.status(200).json(token);
                 }

            }
            catch(err){
                console.error("Faild to login ❌ " , err)
                process.exit(1);
            }

}

const user_signup = async(req  : Request , res : Response) : Promise<any> => {

        const {username , password , mobile , country , city} = req.body
        try{

            //checking for dublicasy
            const is_user = await user.findOne({username});
    
            if(is_user){
                return res.status(400).json({msg : "User already exists"});
            }
    
            // const salt : any = bcrypt.genSalt(10);
            const hashedPassword : any = await bcrypt.hash(password , 10);

            const new_user = new user({
                username : username,
                password : hashedPassword,
                country : country,
                city : city,
                mobile : mobile
            });
            await new_user.save();

            return res.status(200).json({msg : "user is created sucessfully"});

        }
        catch(err){
            console.error("Faild to signup ❌ " , err)
            process.exit(1);
        }


}

export {user_login , user_signup};

