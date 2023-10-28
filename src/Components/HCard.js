import React from 'react'

function HCard({name,image,Category,Price,loading}) {
  return (
    <div className='bg-white p-2 shadow rounded'>
       {
        name && <>  <div className='w-40 min-h-[150px]'>
        <img src={image} className='h-full w-full'></img>
        </div>
        <h3 className='font-semibold text-slate-600 text-center capitalize text-lg'>{name}</h3>
        <p className='text-center text-slate-500 font-medium'>{Category}</p>
        <p className='text-center font-bold'>₹<span>{Price}</span></p>
            
        </>
       }
    </div>
  )
}

export default HCard
