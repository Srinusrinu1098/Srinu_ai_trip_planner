import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center my-9 gap-7'>
      <h2 className='text-[50px] text-center font-extrabold'><span className='text-red-500'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h2>
      <p className='text-center text-gray-400'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to ="/create-trip"><Button>Get Started</Button></Link>
      
    </div>
  )
}

export default Hero
