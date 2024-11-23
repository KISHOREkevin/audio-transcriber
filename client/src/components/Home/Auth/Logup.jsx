import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import {Toaster,toast} from "react-hot-toast"
import baseurl from "../../../api/baseurl.js"
import Loader from '../../Loader/Loader.jsx'
const Logup = () => {
  let navigate = useNavigate();
  let [userDetail,setUserDetail] = useState({
    username:"",
    usermail:"",
    userpassword:""
  })
  let [loading,setLoading] = useState(false);
  let [errormsg,setErrormsg]= useState("");
  let inputHandler = (e)=>{
    let {name,value} = e.target;
    setUserDetail((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  let submitHandler= async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      let response = await axios.post(`${baseurl}/users/create-user/`,userDetail);
      setLoading(false);
      navigate("/auth/login");
      setTimeout(()=>{
        toast.success(response.data.message);
      },1000)
    } catch (error) {
      setLoading(false);
      setTimeout(()=>{
        toast.error(error.response.data.message)
      },1000)
      
    }
    

  }
  if(loading){
    return <Loader/>
  }
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <div className='bg-tertiary p-5 lg:mx-48 mx-3 w-full text-final text-xl rounded-md shadow-lg'>
            <form onSubmit={submitHandler}>
                <label className='text-primary' htmlFor="username">Enter your name :</label><br />
                <input onChange={inputHandler} className='w-full bg-secondary rounded-md' type="text" id='username' name='username' value={userDetail.username} required  /><br /><br />
                <label className='text-primary' htmlFor="usermail">Enter your mail :</label><br />
                <input onChange={inputHandler} className='w-full bg-secondary rounded-md' type="text" name="usermail" value={userDetail.usermail} id="usermail" required /><br /><br />
                <label className='text-primary' htmlFor="userpassword">Enter password :</label><br />
                <input onChange={inputHandler} className='w-full bg-secondary rounded-md' type="password" name="userpassword" id="userpassword" value={userDetail.userpassword} required /><br /><br />
                <button className='w-full bg-secondary px-2 py-1 hover:bg-final hover:text-primary rounded-md'>Submit</button>
            </form>
            <div className='flex mt-3'>
                <Link className='flex-grow text-blue-600' to={"/auth/login"}>Already have an account?</Link>
                <Link className='text-blue-600' to={"/"}>Go home</Link>
            </div>
        </div>
        <Toaster />
    </div>
  )
}

export default Logup