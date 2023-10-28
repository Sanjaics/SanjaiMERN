import React from 'react'
import {CiForkAndKnife} from 'react-icons/ci'

const FilterProducts = ({Category,onClick}) => {
  return (
    <div onClick={onClick}>
    <div className='text-3xl p-5 bg-red-400 rounded-full'>
      <CiForkAndKnife/>
    </div>
     <p className='text-center font-medium my-1 capitalize'>{Category}</p>
    </div>
  )
}

export default FilterProducts
