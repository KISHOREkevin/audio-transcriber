import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './components/Home/Home'
import Logup from './components/Home/Auth/Logup'
import Login from './components/Home/Auth/Login'
import Transcribers from './components/Transcribers/Transcribers'
import NewTranscriber from './components/Transcribers/NewTranscriber'
import TranscribeDetail from './components/Transcribers/TranscribeDetail'
import Loader from './components/Loader/Loader'
import UpdateProfile from './components/Profile/UpdateProfile'
import Error from './components/Error/Error'
import About from './components/Home/About/About'
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element : <Home/>
    },
    {
      path:"/auth/logup",
      element: <Logup/>
    },
    {
      path:"/auth/login",
      element:<Login />
    },
    {
      path:"/:userid/transcribers",
      element: <Transcribers />
    },
    {
      path:"/:userid/transcribers/new-transcibe",
      element:<NewTranscriber/>
    },
    {
      path:"/:userid/transcribers/:transcribeid/transcription",
      element:<TranscribeDetail />
    },
    {
      path:"/:userid/update-profile",
      element:<UpdateProfile />
    },
    {
      path:"/about",
      element:<About />
    },
    {
      path:"*",
      element:<Error />
    }
  ])
  return (
    <>
      <RouterProvider router={router}  />
    </>
  )
}

export default App