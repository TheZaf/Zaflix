import { User } from "../model/user.model.js"
import { fetchFromTMDB } from "../services/tmdb.service.js"

export const searchPerson = async(req,res) =>{
    const {query} = req.params
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if(data.results.length === 0){
            exports.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.userId,{
            $push:{
                searchHistory:{
                    id:data.results[0].id,
                    image:data.results[0].profile_path,
                    title:data.results[0].name,
                    searchType:"person",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({success:true,content:data.results})
    } catch (error) {
        if(error.message.includes("404")) return res.status(404).send(null);
        res.status(500).json({message:"Internal server error"});  
        console.log(" error in search person",error)     
    }
}

export const searchMovie = async(req,res) =>{
    const {query} = req.params
    try {
        const data = await fetchFromTMDB(`
            https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
         if(data.results.length === 0){
            exports.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.userId,{
            $push:{
                searchHistory:{
                    id:data.results[0].id,
                    image:data.results[0].poster_path,
                    title:data.results[0].title,
                    searchType:"movie",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({success:true,content:data.results})

    } catch (error) {
        if(error.message.includes("404")) return res.status(404).send(null);
        res.status(500).json({message:"Internal server error"});  
    }
}

export const searchTv = async(req,res)=>{
    const {query} = req.params
    try {
        const data = await fetchFromTMDB(`
            https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
         if(data.results.length === 0){
            exports.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.userId,{
            $push:{
                searchHistory:{
                    id:data.results[0].id,
                    image:data.results[0].poster_path,
                    title:data.results[0].name,
                    searchType:"tv",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({success:true,content:data.results})
    }catch(error){
        if(error.message.includes("404")) return res.status(404).send(null);
        res.status(500).json({message:"Internal server error"});  
    }

}

export const getSearchHistory = async(req,res)=>{
    try {
        const user = await User.findById(req.userId) 
        res.status(200).json({success:true,content:user.searchHistory})
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
        console.log("error in showing history",error)

    }
}

export const removeHistory = async(req,res)=>{
    const {id} = req.params;
    try {
        await User.findByIdAndUpdate(req.userId,{
            $pull:{
                searchHistory:{id:Number(id)}, 
           },
        });
        res.status(200).json({success:true,message:"Item Removed from history"})
    } catch (error) {
        console.log("error in removing history",error);
        res.status(500).json({message:"Internal server error"})
    }
}