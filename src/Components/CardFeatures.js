import React from 'react'

function CardFeatures  ({image,Price,name,Category,loading}){
  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white shadow-2xl py-5 pt-5 px-4 drop-shadow cursor-auto flex flex-col' >
       {
        image ? <>
        <div className='h-28 flex flex-col justify-center items-center'>
          < img src={image} className='h-full'/>
        </div>
        <h3 className='font-semibold text-slate-600  capitalize text-lg'>{name}</h3>
        <p className=' text-slate-500 font-medium'>{Category}</p>
        <p className=' font-bold'>₹<span>{Price}</span></p>
        <button className='bg-red-400 py-1 my-1'>Add Cart</button>
        </>
        :
        <p>{loading}</p>

       }
      
    </div>
  )
}

export default CardFeatures
