import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";

import {Navbar} from '../componets/navbar.jsx'
import {Footer} from '../componets/footer.jsx'
import { useContentStore } from "../store/content";
import { formatReleaseDate } from "../utils/formatdate.js";
import { LARGE_IMG } from "../utils/constants.js";
import { WatchPageSkeleton } from "../skeletons/wthpgeske.jsx";

export const WatchPage = () => {
    const {id} = useParams()
    const[trailers,setTrailers] = useState([]);
    const[currentTrailerIdx,setCurrentTrailerIdx]=useState(0);
    const [loading,setLoading] = useState(true);
    const [content,setContent] = useState({});
    const {contentType} = useContentStore();

    const api = import.meta.env.MODE === "production" ? "/api/v1" : "http://localhost:5000/api/v1"
    axios.defaults.withCredentials = true;

    const getTrailers = async() =>{
        try {
            const res = await axios.get(`${api}/${contentType}/${id}/trailers`);
            setTrailers(res.data.trailers)
            setCurrentTrailerIdx(0)
        } catch (error) {
            console.log("Error in Getting Trailers!",error)
            setTrailers([])
            setLoading(false)
        }
    }
    const getContent = async() =>{
        try {
            const res = await axios.get(`${api}/${contentType}/${id}/details`)
            setContent(res.data.content)
        } catch (error) {
            console.log("error in getting contents details :",error)
        }finally {
				setLoading(false);
		}
    }

    useEffect(()=>{
        getTrailers()
        getContent()
    },[contentType,id]);

    if (loading)
		return (
			<div className='min-h-screen bg-black p-10'>
				<WatchPageSkeleton />
			</div>
		);

    if (!content) {
		return (
			<div className='bg-black text-white h-screen'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
					</div>
				</div>
			</div>
		);
	}
    
  return <>
    <div className="bg-black min-h-screen text-white">
    <div className="mx-auto container px-4 py-8 h-full">
      <Navbar/>
      {trailers.length > 0 && (
        <div className="flex items-center justify-between mb-4">
        </div>
      )}
         <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
         {trailers.length > 0 && (          
            <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailers[currentTrailerIdx]?.key}`}
                    allowFullScreen={true}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>         
          )}
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
                No trailers available for {" "}
                <span className="font-bold text-red-600">{content?.title || content?.name}</span>
            </h2>
          )}
         </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>
                    <p className="mt-2 text-lg">
                        {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                        {content?.adult ? (
                            <span className="text-red-800">18+</span>
                        ) : (
                            <span className="text-green-600">PG-13</span>
                        )}{" "}
                    </p>
                    <p className="mt-4 text-lg">{content?.overview}</p>              
                </div>
                 <img src ={LARGE_IMG + content.poster_path} className="max-h-[400px] rounded-md"/>
            </div>
        </div>
        <Footer/>
    </div>
  </>
}


