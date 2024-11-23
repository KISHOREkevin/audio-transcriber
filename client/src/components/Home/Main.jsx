import React from 'react'
import transcribeImage from "../../assets/trancribe.png"
import { Link } from 'react-router-dom'
const Main = () => {
  return (
    <div className='my-2 flex  p-3 rounded-md bg-tertiary justify-center'>
    <div className=' text-center '>
      <div className=' '>
        <h1 className='text-3xl'>Echo Audio Transcriber</h1>
        <p>Revolutionizing Transcription with the Power of AI.</p>
      </div>
      <div className='lg:flex  items-center'>
        <div >
          <img className='lg:h-[380px] h-[500px]' src={transcribeImage} alt="transcribe" />
        </div>
        <div className='flex-grow'>
          <Link to={"/auth/logup"}><button className='bg-secondary text-final p-3 rounded-md hover:bg-final hover:text-primary'>Transcribe audio here </button></Link>
        </div>
      </div>
      <div>

      </div>
    </div>
    </div>
   
  )
}

export default Main