import axios from 'axios';
import React, { useState } from 'react'
import baseurl from '../../api/baseurl.js';
import { useNavigate } from 'react-router-dom';
import toast, {  Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader.jsx';

const NewTranscriber = () => {
  let [audiofile,setAudioFile] = useState({});
  let userid = localStorage.getItem("userid");
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();
  let submitHandler= async (e)=>{
    e.preventDefault();
    
    try {
      setLoading(true);
      let formdata = new FormData();
      formdata.append("audiofile",audiofile);
      let response = await axios.post(`${baseurl}/transcribers/create-transcribe/${userid}`,formdata);
      
      navigate(`/${userid}/transcribers/${response.data.transcriber.id}/transcription`);
      setLoading(false);
      setTimeout(()=>{
        toast.success(response.data.message);
      },5000)
    } catch (error) {
      setLoading(false);
      setTimeout(()=>{
        toast.error(error.response.data.message);
      },5000)
    }
    
  }
  if(loading){
    return <Loader />
  }
  return (
    <div className='flex h-[100vh] justify-center items-center'>
        <div className='bg-tertiary p-3 rounded-md shadow-lg'>
            <form onSubmit={submitHandler} className='w-[300px]'>
                <label htmlFor="audiofile">Upload audio file (mp3) :</label><br />
                <input onChange={(e)=>setAudioFile(e.target.files[0])} type="file" accept='audio/mpeg' className='p-3' required />
                <button type='submit' className='bg-secondary w-full mt-2 p-2 rounded-md text-black'>Submit</button>
            </form>
            
        </div>
        <Toaster />
    </div>
  )
}

export default NewTranscriber