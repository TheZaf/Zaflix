import {Routes,Route, Navigate} from  'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'

import SignUpPage from './pages/signuppage.jsx'
import LoginPage from './pages/loginpage.jsx'
import { useAuthStore } from './store/authstore.js'
import HomePage from './pages/homepage.jsx'
import AuthPage from './pages/authpage.jsx'
import { WatchPage } from './pages/watchpage.jsx'
import { NotFoundPage } from './pages/404page.jsx'

function App() {
  const {user,authCheck,isCheckingAuth} = useAuthStore()

      useEffect(() => {
          authCheck()
      }, [])

  if(isCheckingAuth){//loading state
    return(
      <div className='h-screen'>
        <div className='flex items-center justify-center bg-black h-full'>
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }    
      
  return <>
    <Routes>
      <Route path='/' element={user ? <HomePage/> : <AuthPage/>}/>
      <Route path='/signup' element={!user ? <SignUpPage/> : <Navigate to={"/"}/>}/>
      <Route path='/login' element={!user ? <LoginPage/> : <Navigate to={"/"}/>}/>
      <Route path='/watch/:id' element={user ? <WatchPage/> : <Navigate to={"/login"}/>}/>
      <Route path='/*' element={<NotFoundPage/>}/>
    </Routes>
    <Toaster/>
  </>
}

export default App
