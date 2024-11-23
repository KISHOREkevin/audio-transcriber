import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  let userid = localStorage.getItem("userid");
  let usermail = localStorage.getItem("usermail");
  let [hidden,setHidden] = useState(true);
  let logoutHandler = ()=>{
    localStorage.clear();
    navigate("/");
  }
  let hamburmenu = ()=>{
    setHidden(!hidden);
  }
  
  return (
    <div>
        <div className='flex bg-tertiary p-3 rounded-md shadow-lg'>
            <div className='flex-grow'>
                <Link to={"/"}><h1 className='text-2xl p-2'>Echo</h1></Link>
            </div>
            <div>
             
              { hidden ? 
              <>
               <button className='lg:hidden  ' onClick={hamburmenu}> ΞΞΞ </button>
               <ul className='lg:flex  hidden lg:visible space-x-5'>
                <Link to={"/"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary '>Home</li></Link>
                <Link to={"/about"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>About</li></Link>
                {
                  userid !== null && usermail!== null ? 
                  <>
                  <Link to={`/${userid}/transcribers`}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Transcriptions</li></Link>
                  <button onClick={logoutHandler} className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Log out</button>
                  </>
                  :
                  <>
                  <Link to={"/auth/login"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Log in</li></Link>
                  <Link to={"/auth/logup"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Log up</li></Link>
                  </>
                }
                </ul>
              </>
              :
              <>
               <button className='lg:hidden float-right ' onClick={hamburmenu}> |||</button>
               <ul className='flex lg:flex-row flex-col w-full space-y-2  lg:visible lg:space-x-5'>
                <Link to={"/"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary '>Home</li></Link>
                <Link to={"/about"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary '>About</li></Link>
                {
                  userid !== null && usermail!== null ? 
                  <>
                  <Link to={`/${userid}/transcribers`}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Transcriptions</li></Link>
                  <button onClick={logoutHandler} className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Log out</button>
                  </>
                  :
                  <>
                  <Link to={"/auth/login"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Log in</li></Link>
                  <Link to={"/auth/logup"}><li className='bg-secondary px-5 py-2 text-tertiary rounded-md hover:bg-final hover:text-primary'>Log up</li></Link>
                  </>
                }
                </ul>
              </>
              }
               
            </div>
        </div>
    </div>
  )
}

export default Navbar