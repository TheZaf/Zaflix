import axios from 'axios';
import {create} from 'zustand'
import toast from 'react-hot-toast'

const api = "http://localhost:5000/api/v1";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set)=>({
    user:null,
    isLoading:false,
    isCheckingAuth:true,
    signup:async(credentials) =>{
        set({isLoading:true})
        try {
          const res = await axios.post(`${api}/auth/signup`,credentials) 
          set({user:res.data.user,isLoading:false})
          toast.success("User created")
        } catch (error) {
            toast.error(error.response.data.message || "An error occured!")

            set({isLoading:false,user:null})
        }
    },
    logIn:async(credentials)=>{
        set({isLoading:true})
        try {
            const res = await axios.post(`${api}/auth/login`,credentials)
            set({isLoading:false,user:res.data.user})
            toast.success("Logged in Succcessfully!")
        } catch (error) {
            set({isLoading:false,user:null})
            toast.error( error.response.data.message || "error in loggin in!" )
        }
    },
    logOut:async()=>{
        set({isLoading:true})
        try {
            await axios.post(`${api}/auth/logout`)
            set({user:null,isLoading:false})
            toast.success("logged out successfully!")
        } catch (error) {
              console.log("logout error:", error.response)
            toast.error(error.response.data.message||"error in logging out!")
            set({isLoading:false})
        }
    },
    authCheck:async()=>{
        set({isCheckingAuth:true})
        try {
            const res = await axios.get(`${api}/auth/checkauth`);
            set({user:res.data.user,isCheckingAuth:false})
        } catch (error) {
            console.log("error in checking auth",error)
            set({isCheckingAuth:false,user:null})
        }

    }
}));