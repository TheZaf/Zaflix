import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authstore";


const LoginPage = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const{logIn,isLoading} = useAuthStore()

    const handleSubmit = (e) =>{
        e.preventDefault()
        logIn({email,password})
        navigate("/")
        
    }
  return <>
    <div className="hero-bg h-screen w-full">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link>
            <img src='zaflix.png' className="w-40"/>
        </Link>
        </header>
        <div className="flex items-center justify-center mt-20 mx-3">
            <div className=" w-full shadow-sm max-w-md space-y-6 bg-black/60 rounded-lg p-8">
                <h1 className="text-center text-white text2xl font-bold mb-4">Log in</h1>
                <form onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
                        <input type="email" placeholder="your@gmail.com" id="email" value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white"   
                        />
                    </div>
                     <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
                        <input type="password" placeholder="*******" id="email" value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white"   
                        />
                    </div>
                    <button className=" w-full text-white rounded-md font-semibold bg-red-600 py-2 hover:bg-red-700 mt-5">
                    {isLoading ? 'Loading...' : 'Login'}
                    </button>
                    <div className="text-center text-gray-600 mt-5">
                    Don't have an account? <Link to={"/signup"} className="text-red-500">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </>
}

export default LoginPage