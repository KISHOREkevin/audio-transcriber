import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../Loader/Loader';
import axios from 'axios';
import baseurl from '../../api/baseurl';
import { Link, useNavigate, useParams } from 'react-router-dom';
const TranscribeDetail = () => {
    let [transcribeDetail, setTranscribeDetail] = useState([]);
    let [errormsg, setErrormsg] = useState("");
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let { transcribeid } = useParams();
    let userid = localStorage.getItem("userid");
    let usermail = localStorage.getItem("usermail");
    if (userid === null && usermail === null) {
        window.location.href = "/auth/login"
    }
    useEffect(() => {
        let fetchData = async () => {
            try {
                setLoading(true);
                let response = await axios.get(`${baseurl}/transcribers/transcribe/${transcribeid}`);
                let data = response.data;
                setTranscribeDetail(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setErrormsg(error.response.data.message);
            }

        }

        fetchData();

    }, [])

    let deleteTranscribeHandler = async (transcribeid)=>{
        try {
            setLoading(true);
            let response = await axios.delete(`${baseurl}/transcribers/delete-transcribe/${transcribeid}`);
            setTimeout(()=>{
                toast.success(response.data.message);
            },1000)
            navigate(`/${userid}/transcribers`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div>
                <div className='flex'>
                    <h1 className=' flex-grow p-2 text-3xl font-bold'>Transcription</h1>
                    <div>
                    <button onClick={() => document.getElementById("deletemodal").showModal()} className='bg-red-600 text-primary m-3 p-2 rounded-md'>Delete</button>
                    <dialog className='bg-tertiary p-3 text-primary rounded-md' id='deletemodal'>
                        <h1 className='text-xl font-bold'>do you want to delete ?</h1>
                        <form method='dialog' className='flex justify-between mt-3'>
                            <button onClick={()=>deleteTranscribeHandler(transcribeid)}  className='p-3 bg-red-600 rounded-md'>yes</button>
                            <button className='p-3' onClick={() => document.getElementsById("deletemodal").closeModal()}>no</button>
                        </form>
                    </dialog>
                    <Link to={`/${userid}/transcribers`} className='mx-2'>Go back</Link>
                    </div>

                    
                </div>
                {errormsg === "" ?
                    <>
                        <div className='flex  justify-center'>
                            <div className='space-y-5 lg:w-[800px]'>
                                <div >
                                    <audio autoPlay controls className='bg-secondary rounded-md lg:w-[800px] w-[400px]'>
                                        <source src={transcribeDetail.audiofile} type="audio/mp3" />
                                    </audio>

                                </div>
                                <div className='p-3 rounded-md bg-secondary text-black shadow-lg'>
                                    {transcribeDetail.content}
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <h1 className='text-3xl'>{errormsg}</h1>
                    </>
                }

                <Toaster />
            </div>

        </>
    )
}

export default TranscribeDetail