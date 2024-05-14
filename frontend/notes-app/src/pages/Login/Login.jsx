import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import PasswordInput from '../../components/Input/PaswordInput';
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const navigate=useNavigate();

  const handlelogin = async (e) => { //!Therefore, using async in the handlelogin function is necessary to ensure that the function waits for the API request to complete before continuing execution.
    e.preventDefault(); //preventing the form submission from triggering the default behavior, which could be a page reload

    if (!validateEmail(email)) {
      seterror("Please Enter a Valid Email address");
      return;
    }

    if (!password) {
      seterror("Please enter a password");
      return; //The function does not return any value explicitly, but if the email and password are valid, it effectively returns undefined, which is the default return value for JavaScript functions.
    }

    seterror(""); // If both the email and password are valid, the error message is cleare

    //  login API call
    try{
      const response=await axiosInstance.post("/login",{
        email:email,
        password:password,
      });
  
      //handle successfull login response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken);
        navigate('/dashboard');
      }
    }catch(error){
      console.log(error);
      //handle login error
      if(error.response && error.response.data && error.response.data.message){
        seterror(error.response.data.message);
      }else{
        seterror("Something went wrong. Please try again!");
        
      }
  
    }
  };

 
  

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28 sm:p-3">
        <div className="w-96 border rounded bg-white border-black px-7 py-10">
          <form onSubmit={handlelogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Enter Your email"
              className="input-box"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            {error && <p className="text-red-500 font-bold text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered Yet?{" "}&nbsp;
              <Link to="/signUp" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
