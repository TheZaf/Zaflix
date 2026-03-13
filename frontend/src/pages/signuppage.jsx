import { useState } from "react"
import { Link } from "react-router-dom"

import { useAuthStore } from "../store/authstore.js"

const SignUpPage = () => {
    const {searchParams} = new URL(document.location)
    const emailValue = searchParams.get("email")//its takes the email in params

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState(emailValue || "");//we updating the state 
    const [password,setPassword] = useState("")

    const {signup ,isLoading} = useAuthStore()

    const handleSubmit = (e) =>{
        e.preventDefault()
        signup({username,email,password})
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
                <h1 className="text-center text-white text2xl font-bold mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Username</label>
                        <input type="name" placeholder="your name" id="email" value={username} 
                        onChange={(e)=>setUsername(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white"   
                        />
                    </div>
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
                    <button className=" w-full text-white rounded-md font-semibold bg-red-600 py-2 hover:bg-red-700 mt-3">
                     {isLoading ? 'Loading...' : 'Sign up'}
                    </button>
                    <div className="text-center text-gray-600">
                    Already a member? <Link to={"/login"} className="text-red-500">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </>
}

export default SignUpPage