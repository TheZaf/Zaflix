import { useState } from "react"
import { Link } from "react-router-dom"
import { Search,LogOut, Menu } from 'lucide-react'
import { useAuthStore} from '../store/authstore.js'
import { useContentStore } from "../store/content.js"

export const Navbar = () => {
    const [isMobileMenuOpen,setIsMobileMenuOpen] = useState();
    const {user,logOut} = useAuthStore()
    const {contentType,setContentType} = useContentStore()
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

    const handleLogOut = (e)=>{
        try {
            e.preventDefault()
            logOut()
        } catch (error) {
            console.error("error in logging out")
        }

    }

  return <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 ">
        <div className="flex items-center gap-10 z-50 h-full">
            <Link to={'/'}>
             <img src="/zaflix.png" alt="logo" className="w-32 sm:w-40"/>
            </Link>
         {/*Desktop navbar*/}
            <div className="hidden sm:flex gap-2 items-center"> 
                <Link to={'/'} className="hover:text-red-700" onClick={()=> setContentType("movie")}>
                  Movies
                </Link>
                <Link to={'/'} className="hover:text-red-700" onClick={()=> setContentType("tv")}>
                  Tv Shows
                </Link>
                <Link className="hover:text-red-700">
                  Search
                </Link>
            </div>
        </div>

        <div className="flex items-center justify-center gap-2 z-50 ">
            <Link to={'/search'}>
                <Search className="cursor-pointer size-6"/>
            </Link>
            <img src={user?.image} className="h-8 rounded"/>
            <LogOut className="cursor-pointer size-6" onClick={handleLogOut}/>
            <div className="sm:hidden">
            <Menu className="cursor-pointer size-6" onClick={toggleMobileMenu}/>
            </div>
        </div>


        {/*Mobile Navbar*/}
        {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
                <Link to={'/'} className="block hover:underline" onClick={isMobileMenuOpen}>
                    Movies
                </Link>
                <Link to={'/'} className="block hover:underline" onClick={isMobileMenuOpen}>
                    Tv Shows
                </Link>
                <Link to={'/history'} className="block hover:underline" onClick={isMobileMenuOpen}>
                    Search
                </Link>
            </div>
        )}

    </header>
}

