import {  UsersRound } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log(token);
    

    if (token) {
      
      localStorage.setItem("authToken", token);

   
      navigate("/");
    } else {
      console.error("No token provided");
    }
  }, [navigate]);
  return (
    <>
      <div className="w-full min-h-screen font-Quicksand flex flex-col bg-[#E9E8E4] ">
        <Navbar />
        <div className="text-center w-full h-full py-6 px-8 flex items-center justify-center">
       
          <div className="w-full max-w-6xl px-4 py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
            {/* Left Side - Login Card */}
            <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-6">
              
                <h1 className="text-2xl font-bold">Undercover</h1>
              </div>

              <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
              <p className="text-gray-500 mb-8">
                Sign in or create an account to play online & access your progress on all your devices.
              </p>

              <Link to={'http://localhost:8000/auth/google'}>
              <button className="w-full bg-white border border-gray-300 rounded-lg px-6 py-3 h-12 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mb-6">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-gray-700 font-medium">
                  Continue with Google
                </span>
              </button>
              </Link>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Protected by Undercover
                  </span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                By continuing, you agree to our{" "}
                <a href="#" className="text-rose-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-rose-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <UsersRound className="w-10 h-10 text-emerald-600" />
              </div>

              <h2 className="text-4xl font-bold mb-8">
                It's group game that 
                <br />
                you can play online
              </h2>

              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  play online game in one device
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  play online with friends
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  play online with stranger
                </li>
               
              </ul>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="fixed inset-0 -z-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-50/50 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-rose-50/50 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
