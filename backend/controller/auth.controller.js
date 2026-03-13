import bcrypt from "bcryptjs";
import  {User}  from "../model/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generatetoken.js";

export const signUp = async(req,res) =>{
    try {
       const {username,email,password} = req.body;
       if(!username || !email || !password) return res.status(400).json({message:"all fields are required"})

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!emailRegex.test(email)) return res.status(400).json({message:"Invalid email!"})
    
       if(password.length < 6) return res.status(400).json({message:"password should be morethan 6 characters"})
        
       const existEmail = await User.findOne({email:email}); 
       if(existEmail) return res.status(400).json({message:"email already exist"})
       
       const existUser = await User.findOne({username:username});
       if(existUser) return res.status(400).json({message:"username is already exist"})

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
		const image = PROFILE_PICS[newUser.username.length % PROFILE_PICS.length];

       const newUser = new User({
        username,
        email,
        password:hashedPassword,
        image,
       }) 

       generateTokenAndSetCookie(newUser._id,res)

       await newUser.save()

       res.status(201).json({
        message:"user created successfully",
        user:{
            ...newUser._doc,
            password:"",
        },
       })
        
    } catch (error) {
        console.log("error in sign up controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const logIn = async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({message:"all fields are required"})

        const existUser = await User.findOne({email:email});
        if(!existUser) return res.status(400).json({message:"invalid user"})    
            
        const isMatch = await bcrypt.compare(password,existUser.password);
        if(!isMatch) return res.status(400).json({message:"wrong password"})    

        generateTokenAndSetCookie(existUser._id,res)    
        
        res.status(200).json({
            message:"logged in successfully",
            user:{
                ...existUser._doc,
                password:'',
            },
        })
    } catch (error) {
        console.log("error in login controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logOut = async(req,res) =>{
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("error in logout controller",error);
        res.status(500).json({message:"Internal server error"})
    }

}

export const authCheck = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password") // ✅ fetch using userId
        res.status(200).json({ success: true, user: user })
    } catch (error) {
        console.log("error in checking auth", error);
        res.status(500).json({ message: "internal server error" })
    }
}