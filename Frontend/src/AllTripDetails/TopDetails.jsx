import React from 'react'

function TopDetails(props) {

    const {trips} = props


    
  
  return (
    <div className='px-9 my-6'>
      <img src="/travel.jpg" className="sm:w-[650px] md:w-[800px] lg:w-[600px] xlg:w-[800px] w-[800px]" style ={{borderRadius:"24px"}} />

      <h2 className=' font-mono py-2 text-gray-800 font-extrabold'>{trips.location}</h2>
      <div className='flex  gap-3 items-center'>
        <p className='bg-slate-600 text-slate-300 rounded-md px-2 max-w-[200px]  text-sm'>🏞️ {trips.duration}</p>
        <p className='bg-slate-600 text-slate-300 rounded-md px-2 max-w-[200px]  text-sm'>💰 {trips.budget}</p>
        <p className='bg-slate-600 text-slate-300 rounded-md px-2 max-w-[200px]  text-sm'>✈️ {trips.travelers}</p>
      
      </div>
      
    </div>
  )
}

export default TopDetails
