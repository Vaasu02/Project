import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PaswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Signup = () => {

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate=useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please Enter Username");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please Enter valid Email");
      return;
    }


    if (!password) {
      setError("Please Enter password");
      return;
    }

    setError("");

    //signup call API
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName:name,
        email: email,
        password: password,
      });

      //handle successfull registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      //handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again!");
        console.log(error);

      }

    }

  }

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28 sm:p-3">
        <div className="w-96 border rounded border-black bg-white px-7 py-10">
          <form onSubmit={handlesignup}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Username"
              className="input-box"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 font-bold text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}&nbsp;
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup