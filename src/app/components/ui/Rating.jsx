import React from "react";
import { IoIosStarHalf } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";

export default function Rating({ rating, fontSize, handleRatingSelection }) {
  return (
    <div className="flex text-[#e7e9e8] text-lg" style={{ fontSize: fontSize }}>
      {new Array(Math.floor(rating)).fill(0).map((_, index) => (
        <div key={index} className="flex">
          {handleRatingSelection ? (
            <>
              <button
                className="cursor-pointer"
                onClick={() => handleRatingSelection(rating)}
              >
                <IoStarSharp className="text-[#f8cc15]" />
              </button>
            </>
          ) : (
            <IoStarSharp className="text-[#f8cc15]" />
          )}
        </div>
      ))}
      {rating === 4 ? (
        <IoStarSharp
          className="cursor-pointer"
          onClick={() => handleRatingSelection(rating)}
        />
      ) : rating === 3 ? (
        <button
          className="cursor-pointer flex"
          onClick={() => handleRatingSelection(rating)}
        >
          <IoStarSharp />
          <IoStarSharp />
        </button>
      ) : rating === 2 ? (
        <button
          className="cursor-pointer flex"
          onClick={() => handleRatingSelection(rating)}
        >
          <IoStarSharp />
          <IoStarSharp />
          <IoStarSharp />
        </button>
      ) : (
        rating <= 1 && (
          <button
            className="cursor-pointer flex"
            onClick={() => handleRatingSelection(rating)}
          >
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
          </button>
        )
      )}
      {!Number.isInteger(rating) && <IoIosStarHalf />}
    </div>
  );
}
