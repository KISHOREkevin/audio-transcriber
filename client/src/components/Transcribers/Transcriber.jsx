import React from 'react'
import { Link } from 'react-router-dom'

const Transcriber = ({userid,transcriberid,transcribecontent}) => {
  return (
    <>
    <Link to={`/${userid}/transcribers/${transcriberid}/transcription`}>
        <div className='p-5 lg:h-60 lg:w-60 w-80 h-80 m-1 rounded-md bg-tertiary'>
           <div className='h-52 overflow-hidden'>
           {`${transcribecontent.slice(0,130)}...`}
           </div>
          
        </div>
    </Link>
    </>
  )
}

export default Transcriber