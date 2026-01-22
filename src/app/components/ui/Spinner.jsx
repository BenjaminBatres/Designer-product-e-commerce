import React from 'react'

export default function Spinner() {
  return (
    <div className='fixed flex justify-center items-center inset-0 bg-gray-300/40'>
        <i className='bx  bx-loader-lines text-5xl animate-spin'></i> 
    </div>
  )
}
