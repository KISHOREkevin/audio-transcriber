import React from 'react'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
        
      <div className="max-w-4xl bg-tertiary rounded-lg shadow-lg p-8">
       <div className='flex '>
       <h1 className="text-3xl flex-grow font-bold  mb-4">
          About Our Project
          
        </h1>
        <Link to={"/"}>Go back</Link>
       </div>
        <p className=" leading-relaxed mb-4">
          Welcome to our AI-based Audio Transcription platform! We aim to
          simplify audio-to-text conversion with advanced artificial
          intelligence. Our tool is designed to deliver fast, accurate, and
          reliable transcription services for a wide range of applications,
          including business, education, and media.
        </p>
        <h2 className="text-xl font-semibold  mt-6 mb-2">
          Key Features:
        </h2>
        <ul className="list-disc pl-5  space-y-2">
          <li>High accuracy powered by state-of-the-art AI models.</li>
          <li>User-friendly interface for seamless transcription.</li>
          <li>Quick turnaround times for efficient workflows.</li>
        </ul>
        <p className=" mt-6">
          Whether you're a professional needing precise transcripts or a student
          managing lecture recordings, our tool empowers you to work smarter.
          Try it today and experience the future of transcription technology.
        </p>
      </div>
    </div>
  )
}

export default About