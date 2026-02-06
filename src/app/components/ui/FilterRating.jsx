import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Rating from "./Rating";

export default function FilterRating({
  handleRatingSelection,
  isCollapsed,
  setIsCollapsed,
  idx,
}) {
  return (
    <div className="border-b border-gray-400 overflow-hidden">
      <div
        className={`flex items-center justify-between transition-all duration-300`}
        onClick={() => setIsCollapsed(idx)}
        style={{ marginBottom: idx === isCollapsed && "16px" }}
      >
        <div className="font-semibold text-lg">Rating</div>
        {idx === isCollapsed ? (
          <FaPlus className="cursor-pointer" />
        ) : (
          <FaMinus className="cursor-pointer" />
        )}
      </div>
      <div
        className={`space-y-4 overflow-hidden transition-height duration-300 mb-4`}
        style={{ height: idx === isCollapsed ? 180 : 0 }}
      >
        <Rating
          handleRatingSelection={handleRatingSelection}
          rating={5}
          fontSize={22}
        />
        <Rating
          handleRatingSelection={handleRatingSelection}
          rating={4}
          fontSize={22}
        />
        <Rating
          handleRatingSelection={handleRatingSelection}
          rating={3}
          fontSize={22}
        />
        <Rating
          handleRatingSelection={handleRatingSelection}
          rating={2}
          fontSize={22}
        />
        <Rating
          handleRatingSelection={handleRatingSelection}
          rating={1}
          fontSize={22}
        />
      </div>
    </div>
  );
}
