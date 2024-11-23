import React from 'react'
import image404 from "../../assets/404.png"
const Error = () => {
  return (
    <div className='flex h-[100vh] justify-center items-center'>
        <div className='bg-tertiary rounded-md shadow-lg'>
            <img width={400} src={image404} alt="404" />
        </div>
    </div>
  )
}

export default Error