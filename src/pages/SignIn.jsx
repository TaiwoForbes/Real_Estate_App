import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const [revealPassword, setRevealPassword] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

const onSubmit = async (e) => {
  e.preventDefault()
  try{
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth,email,password)
    if(userCredential.user){
      navigate("/")
    }


  }catch(error){
    toast.error("Incorrect email or password")
  }
   
}

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold ">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto gap-20">
        <div className=" md:w-[67%] lg:w-[50%] mb-12 md:md-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full  rounded-2xl"
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%]">
          <form onSubmit={onSubmit}>
            <input
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
            />
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={revealPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="password"
              />
              {revealPassword ? (
                <AiFillEyeInvisible
                  className="text-black absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setRevealPassword((prev) => !prev)}
                />
              ) : (
                <AiFillEye
                  className="text-black absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setRevealPassword((prev) => !prev)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Don't have an account? <span className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out"><Link to='/sign-up'>Register</Link></span>
              </p>
              <p className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">
                <Link to='/forgot-password'>Forgot Password</Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 hover:shadow-lg active:bg-blue-800 ease-in-out" type="submit">Sign In
          </button>

          <div className='py-4 flex items-center  before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
            <p className="text-center font-semibold mx-4">OR
            </p>
          </div>
          <OAuth/>
          </form>
          
          
        </div>
      </div>
    </section>
  );
};

export default SignIn;
