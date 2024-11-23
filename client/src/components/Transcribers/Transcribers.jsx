import React, { useEffect, useState } from 'react'
import Transcriber from './Transcriber'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Loader from '../Loader/Loader'
import axios from 'axios'
import baseurl from '../../api/baseurl'

const Transcribers = () => {
    let [loading,setLoading] = useState(false);
    let [transcribers,setTranscribers] = useState([]);
    let [errormsg,setErrormsg] = useState("");
    let userid = localStorage.getItem("userid");
    let usermail = localStorage.getItem("usermail");
    let [hidden,setHidden] = useState(true)
    if(userid === null  && usermail===null){
        window.location.href = "/auth/login"
    }
    let hamburmenu = ()=>{
        setHidden(!hidden);
    }
    useEffect(()=>{
        
            setLoading(true);
            let fetchData = async ()=>{
               try {
                let response = await axios.get(`${baseurl}/transcribers/transcribe/user/${userid}`);
                let data = response.data;
                setTranscribers(data);
               } catch (error) {
                setErrormsg(error.response.data.message);
               }
            }
            fetchData();
            setLoading(false);  
       
        
    },[])
    let logoutHandler = ()=>{
        localStorage.clear();
        window.location.href="/";
      }
    
    if(loading){
        return <Loader />
    }



    return (
        <>
            <div>
                <div className='p-3 flex flex-auto space-x-2'>
                    <h1 className='text-3xl font-bold  lg:flex-grow'>Saved Transcriptions</h1>
                     {hidden ? 
                        <>
                         <button className='lg:hidden w-full float-right' onClick={hamburmenu}> ΞΞΞ </button>
                            <div className='hidden lg:flex space-x-2'>
                    <Link to={`/${userid}/transcribers/new-transcibe`}><button className='bg-tertiary p-3 rounded-md'>Add New</button></Link>
                    <Link to={`/${userid}/update-profile`}><button className='bg-tertiary p-3 rounded-md'>Profile</button></Link>
                    <button onClick={logoutHandler} className='bg-tertiary p-3 rounded-md'>Log out</button>
                    </div>  
                        </>
                    :
                        <>
                        
                        <div className='lg:space-x-2 space-y-2 w-full lg:flex-row flex-col'>
                        <button className='lg:hidden block float-right' onClick={hamburmenu}> |||</button>
                    <Link to={`/${userid}/transcribers/new-transcibe`}><button className='bg-tertiary p-3 rounded-md'>Add New</button></Link>
                    <Link to={`/${userid}/update-profile`}><button className='bg-tertiary p-3 rounded-md'>Profile</button></Link>
                    <button onClick={logoutHandler} className='bg-tertiary p-3 rounded-md'>Log out</button>
                    </div>
                        
                        </>
                    } 
                    
                   
                </div>
                <div className='flex flex-wrap justify-center  '>

                    {errormsg === "" ? transcribers.map((transcribe)=>{
                        return <Transcriber key={transcribe.id} userid={transcribe.userid} transcriberid={transcribe.id} transcribecontent={transcribe.content}  />
                    }) : 
                        <h1 className='text-2xl '>{errormsg}</h1>
                    }

                </div>
                <Toaster />
            </div>

        </>
    )
}

export default Transcribers