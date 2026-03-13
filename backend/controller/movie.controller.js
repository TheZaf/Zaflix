import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingMovie = async(req,res) =>{
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/discover/movie?with_original_language=hi&sort_by=popularity.desc&region=IN&primary_release_date.gte=2025-01-01&vote_count.gte=50");
        const randomMovie = data.results.slice(0, 5)[Math.floor(Math.random() * 5)];

        res.status(200).json({
            message:"movie fetched successfully!",
            content:randomMovie,
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in fetching data from TMDB",error)
    }

}

export const getMovieTrailers = async(req,res) =>{
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos`)
        res.status(200).json({success:true,trailers:data.results})
    } catch (error) {
        if(error.message.includes("404")){
          return res.status(404).json({message:"Movie not found!"})
        }
        res.status(500).json({message:"Internal server error"})
    }
}

export const getMovieDetials = async(req,res) =>{
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}`)
        res.status(200).json({success:true,content:data})
    } catch (error) {
         if(error.message.includes("404")){
          return res.status(404).send(null);
        }
        res.status(500).json({message:"Internal server error"});
    }
}

export const getSimilarMovies = async(req,res) =>{
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar`)
        res.status(200).json({success:true,content:data.results})
    } catch (error) {
         if(error.message.includes("404")){
          return res.status(404).send(null);
        }
        res.status(500).json({message:"Internal server error"});
    }
}

export const getMoviesByCategory = async(req,res) =>{
    const{category} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}`)
        res.status(200).json({success:true,content:data.results})
        
    } catch (error) {
        if(error.message.includes("404")){
         return res.status(404).send(null);
        }
        res.status(500).json({message:"Internal server error"});
    }
}