import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import baseurl from '../../api/baseurl';
import Loader from '../Loader/Loader';
const UpdateProfile = () => {
    let userid = localStorage.getItem("userid");
    let usermail = localStorage.getItem("usermail");
    let navigate = useNavigate();
    if(userid === null  && usermail===null){
        window.location.href = "/auth/login"
    }
    let [loading,setLoading] = useState(false);
    let [userDetail,setUserDetail] = useState({
        username:"",
        usermail:""
    })
    useEffect(()=>{
        let fetchData = async ()=>{
            try{
                setLoading(true);
                let response = await axios.get(`${baseurl}/users/user/${userid}/`);
                let data = response.data;
                setUserDetail({
                    username:data.username,
                    usermail:data.usermail
                })
                setLoading(false);
            }catch(error){
                setLoading(false);
                toast.error(error.response.data.message);
            }
        }

        fetchData();
    },[])
    let inputHandler = (e)=>{
        let {name,value} = e.target;
        setUserDetail((prev)=>{
          return{
            ...prev,
            [name]:value
          }
        })
      }

      let submitHandler = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            let response = await axios.put(`${baseurl}/users/update-user/${userid}`,userDetail);
            navigate(`/${userid}/transcribers`);
            setTimeout(()=>{
                toast.success(response.data.message);
            },1000)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
      }
    if(loading){
        return <Loader />
    }
  return (
    <div className='flex justify-center items-center h-[100vh]'>
    <div className='bg-tertiary p-5 lg:mx-48 mx-3 w-full text-final text-xl rounded-md shadow-lg'>
        <form onSubmit={submitHandler}>
            <label className='text-primary' htmlFor="username">Enter your name :</label><br />
            <input onChange={inputHandler} className='w-full bg-secondary rounded-md' type="text" id='username' name='username' value={userDetail.username} required  /><br /><br />
            <label className='text-primary' htmlFor="usermail">Enter your mail :</label><br />
            <input onChange={inputHandler} className='w-full bg-secondary rounded-md' type="text" name="usermail" value={userDetail.usermail} id="usermail" required /><br /><br />
            
            <button className='w-full bg-secondary px-2 py-1 hover:bg-final hover:text-primary rounded-md'>Submit</button>
        </form>
        <div className='float-right mt-3'>
            
            <Link className='text-primary' to={`/${userid}/transcribers`}>Go Back</Link>
        </div>
    </div>
    <Toaster />
</div>
  )
}

export default UpdateProfile