import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Header from './Header'

function Register() {
  let navigate = useNavigate()

  const [state, setState] = useState({employee_name:'',employee_email:'',employee_password:''})

  const {employee_name, employee_email, employee_password} = state

  const handleChange = (e) => {
    setState({...state, [e.target.name]:e.target.value})
  }

  const submitForm = async() => {
    let res = await axios.post('/register',state)
    if(res.data.msg==="REGISTERED"){
      alert("Registered Successfully. Please Login")
      navigate('/')
    }else{
      alert(res.data.msg)
    }
  }



  return (
    
    <>
     <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 bg-white shadow-lg">
        <h1 className=" text-3xl text-center">Register</h1>
          <div className="my-4">
            <label className=" text-base font-bold">Name</label>
            <input
              className=" border-2 w-full mt-2 p-1"
              type="text"
              name="employee_name"
              value={employee_name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              id="username"
            />
          </div>
          <div className="my-4">
            <label className=" text-base font-bold">Email Address</label>
            <input
              className=" border-2 w-full mt-2 p-1"
              type="text"
              name="employee_email"
              value={employee_email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              id="username"
            />
          </div>
          <div className="my-4">
            <label className=" text-base font-bold">Password</label>
            <input
              className=" border-2 w-full mt-2 p-1"
              type="text"
              name="employee_password"
              value={employee_password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              id="username"
            />
          </div>
          <div className=" flex justify-center items-center mt-2">
            <button onClick={submitForm} className=" border-2 text-white px-10 p-1 my-2 bg-teal-600">
              Register
            </button>
          </div>
          <div class="mt-3 text-grey-dark">
            Already have an account?
            <a class=" text-teal-600 hover:underline" href="/">
              Log in
            </a>
          </div>

      </div>
    </div>
    </>
  );
}

export default Register;
