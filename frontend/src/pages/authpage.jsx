import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Faq from "../componets/faq.jsx";
import { Footer } from "../componets/footer.jsx";

const AuthPage = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate("/signup?email="+ email)//gives the email in params
  }

  return (
    <div>
      {/* HERO BACKGROUND */}
      <div className="hero-bg relative">

        {/* NAVBAR SECTION */}
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
          <img src="/zaflix.png" className="w-32 md:w-40" alt="Netflix Logo" />
          <Link to={"/login"} className="text-white bg-red-700 py-1 px-2 rounded">
            Log in
          </Link>
        </header>

        {/* HERO SECTION */}
        <div className="flex flex-col items-center justify-center text-center text-white py-40 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4"> Unlimited Movies,<br />shows, and more</h1>
          <p className="text-lg mb-4">Starts at ₹149. Cancel at any time.</p>
          <p className="mb-4">Ready to Watch? Enter your email to create or restart yourmembership.</p>

          <form className="flex flex-col md:flex-row gap-4 w-1/2" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              placeholder="Email address"
              className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="text-white bg-red-600 font-bold p-2 rounded">
              Get Started
            </button>
          </form>
        </div>
      </div>

      {/* TRENDING SECTION */}
        <div className="mx-auto bg-black text-white">
            <div className="flex items-center justify-center font-bold text-3xl py-5">
            <h1>Trending Now</h1>
            </div>
            <div className="flex flex-row items-center justify-center">
            <div><img className="rounded-md px-2 py-2" src="/p1.jpg" alt="poster1"/></div>
            <div><img className="rounded-md px-2 py-2" src="/p2.jpg" alt="poster2" /></div>
            <div><img className="rounded-md px-2 py-2" src="/p3.jpg" alt="poster3" /></div>
            <div><img className="rounded-md px-2 py-2" src="/p4.jpg" alt="poster4" /></div>
            </div>
        </div>
        <div className="mx-auto bg-black text-white">
         <Faq/>
         <Footer/>
        </div>

    </div>
  );
};

export default AuthPage;