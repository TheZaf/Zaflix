import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true,
    },
    email:{
        required:true,
        type:String,
        unique:true,
    },
    password:{
        required:true,
        type:String,
    },
    image:{
        type:String,
        default:"",
    },
    searchHistory:{
        type:Array,
        default:[]
    }
},{timestamps:true})

/** @type {mongoose.Model} */
export const User = mongoose.model('User',userSchema);

