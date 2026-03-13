import { Link } from "react-router-dom"
import { Info, Play} from "lucide-react"

import { Navbar } from "../componets/navbar.jsx"
import { useGetTrendingContent } from "../hooks/usetrending.jsx"
import { LARGE_IMG, MOVIE_CATEGORIES, TV_CATEGORIES } from "../utils/constants.js"
import { useContentStore } from "../store/content.js"
import { Slider } from "../componets/slider.jsx"
import { Footer } from "../componets/footer.jsx"

const HomePage = () => {
  const {trendingContent} = useGetTrendingContent()
  const {contentType} = useContentStore()

  // if(true)// this is loading state while trending is fetching
  //  return(
  //    <div className="h-screen text-white relative">
  //     <Navbar/>
  //     <div className="absolute top-0 left-0 h-full w-full bg-black/70 flex items-center justify-center -z-10 loading"></div>
  //   </div>
  //  );

  
  return (<>
  <div className="relative h-screen text-white">
    <Navbar/>
    <img src={LARGE_IMG + trendingContent?.backdrop_path} className="absolute top-0 left-0 w-full h-full object-cover -z-50"/>
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden='true'/>
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
      <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-50"/>
      <div className="max-w-2xl">
        <h1 className="mt-4 text-5xl font-extrabold text-balance">{trendingContent?.title || trendingContent?.name }</h1>
        <p className="mt-2 text-lg">
        {trendingContent?.release_date?.split('-')[0] || trendingContent?.first_air_date?.split('-')[0]} | {trendingContent?.adult ? "18+" : "PG-13"}</p>
        <p className="mt-4 text-lg w-10/12">{trendingContent?.overview}</p>
      </div>
      <div className="flex mt-8">
        <Link to={`/watch/${trendingContent?.id}`} className="bg-white text-black font-bold py-2 px-4 rounded mr-4 flex items-center">
          <Play className="size-6 cursor-pointer inline-block mr-2 fill-black"/>
          Play
        </Link>
        <Link to={`/watch/${trendingContent?.id}`} className=" bg-gray-500/70 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
          <Info className="size-6 cursor-pointer inline-block mr-2"/>
          More Info
        </Link>

      </div>
    </div>
  </div>
  <div className="flex flex-col gap-5 bg-black py-10">
    {contentType === "movie"
    ? MOVIE_CATEGORIES.map((category)=> <Slider key={category} category={category}/>)
    : TV_CATEGORIES.map((category)=> <Slider key={category} category={category}/>)}
  </div>
  <Footer/>
   </>)
}

export default HomePage
