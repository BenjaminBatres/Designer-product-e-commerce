import React from 'react'
import SkeletonBox from './SkeletonBox'

export default function SkeletonProductCard({productCards}) {
  return Array(productCards).fill(0).map((_,id) => (
    <div className='w-full sm:w-[49%] lg:w-[23%] mt-15' key={id}>
        <SkeletonBox width={'100%'} height={348}/>
        <SkeletonBox width={'100%'} height={'1.5rem'} marginTop={16}/>
        <SkeletonBox width={'20%'} height={'1.2rem'} marginTop={16}/>
        <SkeletonBox width={'30%'} height={'1.2rem'} marginTop={8}/>
    </div>
  ))
  
}
