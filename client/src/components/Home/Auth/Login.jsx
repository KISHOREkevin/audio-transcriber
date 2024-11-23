import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import baseurl from '../../../api/baseurl.js'
import Loader from '../../Loader/Loader.jsx'
const Login = () => {
  let [userDetail,setUserDetail] = useState({
    usermail:"",
    userpassword:""
  })
  let navigate = useNavigate();
  let [loading,setLoading] = useState(false);
 
  let inputHandler = (e)=>{
    let {name,value} = e.target;
    setUserDetail((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  let submitHandler = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      let response = await axios.post(`${baseurl}/users/login-user/`,userDetail);
      localStorage.setItem("userid",response.data.userid);
      localStorage.setItem("usermail",userDetail.usermail);
      setLoading(false);
      navigate(`/${response.data.userid}/transcribers`);
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
    return <Loader />
  }

  return (
    <div className='flex justify-center items-center h-[100vh]'>
    <div className='bg-tertiary p-5 lg:mx-48 m-3 w-full text-final text-xl rounded-md shadow-lg'>
        <form onSubmit={submitHandler}>
            <label className='text-primary' htmlFor="usermail">Enter your mail :</label><br />
            <input onChange={inputHandler} className='w-full bg-secondary rounded-md' type="text" name="usermail" id="usermail" value={userDetail.usermail} required /><br /><br />
            <label className='text-primary' htmlFor="userpassword">Enter password :</label><br />
            <input onChange={inputHandler} className='w-full bg-secondary rounded-md' type="password" name="userpassword" id="userpassword" value={userDetail.userpassword} required /><br /><br />
            <button className='w-full bg-secondary px-2 py-1 hover:bg-final hover:text-primary rounded-md'>Submit</button>
        </form>
        <div className='flex mt-3'>
                <Link className='flex-grow text-blue-600' to={"/auth/logup"}>Create New Account</Link>
                <Link className='text-blue-600' to={"/"}>Go home</Link>
        </div>
    </div>
    <Toaster />
</div>
  )
}

export default Login