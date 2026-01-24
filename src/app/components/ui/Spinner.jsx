import React from 'react'

export default function Spinner({position}) {
  return (
    <div className='flex justify-center items-center inset-0 bg-gray-300/40' style={{position: position}}>
        <i className='bx  bx-loader-lines text-5xl animate-spin'></i> 
    </div>
  )
}
