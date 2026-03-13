import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'
import { connectDb } from './db/db.js'
import { protectedRoute } from './middleware/middleware.js'

const app = express();
dotenv.config()

const PORT = process.env.PORT;
const __dirname =path.resolve()

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));//parse the req.body

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectedRoute,movieRoutes);
app.use("/api/v1/tv",protectedRoute,tvRoutes);
app.use("/api/v1/search",protectedRoute,searchRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*splat",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    connectDb()
    console.log("server is running on :",PORT)
})