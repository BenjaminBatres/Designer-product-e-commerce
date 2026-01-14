import React from 'react'

export default function Spinner() {
  return (
    <div className='absolute flex justify-center items-center inset-0 bg-gray-300/40'>
        <i class='bx  bx-loader-lines text-5xl animate-spin'></i> 
    </div>
  )
}
