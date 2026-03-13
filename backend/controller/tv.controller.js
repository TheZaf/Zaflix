import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingTV = async(req,res) =>{
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day");
        const randomMovie = data.results.slice(0,10)[Math.floor(Math.random() * 10)];

        res.status(200).json({
            message:"Tv fetched successfully!",
            content:randomMovie,
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in fetching data from TMDB",error)
    }

}

export const getTvTrailers = async(req,res) =>{
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos`)
        res.status(200).json({success:true,trailers:data.results})
    } catch (error) {
        if(error.message.includes("404")){
          return res.status(404).json({message:"Movie not found!"})
        }
        res.status(500).json({message:"Internal server error"})
    }
}

export const getTvDetials = async(req,res) =>{
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}`)
        res.status(200).json({success:true,content:data})
    } catch (error) {
         if(error.message.includes("404")){
          return res.status(404).send(null);
        }
        res.status(500).json({message:"Internal server error"});
    }
}

export const getSimilarTv = async(req,res) =>{
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar`)
        res.status(200).json({success:true,content:data.results})
    } catch (error) {
         if(error.message.includes("404")){
          return res.status(404).send(null);
        }
        res.status(500).json({message:"Internal server error"});
    }
}

export const getTvByCategory = async(req,res) =>{
    const{category} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}`)
        res.status(200).json({success:true,content:data.results})
        
    } catch (error) {
        if(error.message.includes("404")){
         return res.status(404).send(null);
        }
        res.status(500).json({message:"Internal server error"});
    }
}