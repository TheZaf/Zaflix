import { useEffect, useState } from "react"
import { useContentStore } from "../store/content.js"
import axios from "axios"

export const useGetTrendingContent = () => {
    const [trendingContent,setTrendingContent] = useState("")
    const {contentType} = useContentStore()

    const api = "http://localhost:5000/api/v1";
    axios.defaults.withCredentials = true;

    const getTrendingContent = async()=>{
        try {
            const res = await axios.get(`${api}/${contentType}/trending`)
            setTrendingContent(res.data.content)
        } catch (error) {
            console.log("error in get trending content",error)
        }
    }

    useEffect(()=>{
        getTrendingContent()
    },[contentType])

    return { trendingContent }
 
}


