import React from 'react'
import { CiStar } from "react-icons/ci";
import { FaRegStarHalf } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";

export default function Rating({rating}) {
  return (
    <div className='flex text-[#f8cc15] text-lg'>
        {
            new Array(Math.floor(rating)).fill(0).map((_,index) => <IoStarSharp key={index}/>)
        }
        {
            !Number.isInteger(rating) && <IoIosStarHalf />
        }
    </div>
  )
}
