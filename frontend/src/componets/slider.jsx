import { useEffect, useRef, useState } from "react"
import { useContentStore } from "../store/content"
import axios from "axios"
import { Link } from "react-router-dom"
import { SMALL_IMG } from "../utils/constants"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const Slider = ({category}) => {
    const {contentType} = useContentStore()
    const formattedCategoryName =category.replaceAll("_"," ")[0].toUpperCase()+category.replaceAll("_"," ").slice(1);
    const formattedContentType = contentType === "movie" ? "Movie" : "Tv Shows"
    const [content,setContent] = useState([])
    const [showArrow,setArrow] = useState(false)

    const sliderRef = useRef(null)

    const api = import.meta.env.MODE === "production" ? "/api/v1" : "http://localhost:5000/api/v1"
    axios.defaults.withCredentials = true;

    const getContent = async()=> {
        try {
            const res = await axios.get(`${api}/${contentType}/${category}`)
            setContent(res.data.content)
        } catch (error) {
            console.log("error in getting content ",error)
        }
    }

    useEffect(()=>{
        getContent()
    },[contentType,category])

    const scrollLeft = () =>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior: 'smooth'})
        }
    }
    const scrollRight = () =>{
          if(sliderRef.current){
            sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth,behavior: 'smooth'})
        }
    }


  return <>
    <div className="text-white relative px-5 md:px-20" 
    onMouseEnter={()=>setArrow(true)}
    onMouseLeave={()=>setArrow(false)}
    >
        <h2 className="mb-4 font-bold text-2xl">{formattedCategoryName} {formattedContentType}</h2>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
          {content.map((item)=>(
            <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                <div className="rounded-lg overflow-hidden">
                    <img src={SMALL_IMG+item.backdrop_path}
                    className=" transition-transform duration-300 ease-in-out group-hover:scale-125"/>
                </div>
                <p className="text-center mt-2">{item.title || item.name}</p>
            </Link>
          ))}

        </div>
        {/* THIS IS THE ARROW LEFT AND RIGHT BUTTONS  */}
        {showArrow && (
            <> 
            <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left:20 flex items-center justify-center size-12 rounded-full
            bg-white bg-opacity-50 hover:bg-opacity-75 text-white z-10" onClick={scrollLeft}>
               <ChevronLeft size={24}/>
            </button>
            <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right:20 flex items-center justify-center size-12 rounded-full
            bg-white bg-opacity-50 hover:bg-opacity-75 text-white z-10" onClick={scrollRight}>
               <ChevronRight size={24}/>
            </button>
            </>  
        )}
    </div>
  </>
}

