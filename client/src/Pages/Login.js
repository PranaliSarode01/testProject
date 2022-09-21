import React, {useState, useEffect, useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Header from './Header'

function Login(props) {

  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({employee_email:'', employee_password:''})
  const {employee_email, employee_password} = credentials

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  const submitForm = async() => {
    let loginUser = await axios.post('/login', credentials)
      if(loginUser.data.msg==="LOGGEDIN"){
        navigate('/home')
      }else{
        alert(loginUser.data.msg)
      }
  }

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 bg-white shadow-lg">
        <h1 className=" text-3xl text-center">Login</h1>
          <div className="my-4">
            <label className=" text-base font-bold">Email Address</label>
            <input
              className=" border-2 w-full mt-2 p-1"
              type="text"
              onChange={handleChange}
              value={employee_email}
              name="employee_email"
              placeholder="Enter Your Email"
              id="username"
            />
          </div>
          <div className="my-4">
            <label className=" text-base font-bold">Password</label>
            <input
              className=" border-2 w-full mt-2 p-1"
              type="text"
              onChange={handleChange}
              value={employee_password}
              name="employee_password"
              placeholder="Enter Your Password"
              id="username"
            />
          </div>
          <a className=" text-sm text-teal-600" href="/forget">
            Forget Password?
          </a>
          <div className=" flex justify-center items-center mt-2">
            <button onClick={submitForm} className=" border-2 text-white px-10 p-1 my-2 bg-teal-600">
              Login
            </button>
          </div>

          <div className="mt-3 text-grey-dark">
            New user?
            <a className=" text-teal-600 hover:underline" href="/register">
              Register
            </a>
          </div>
      </div>
    </div>
    </>
  );
}

export default Login;
