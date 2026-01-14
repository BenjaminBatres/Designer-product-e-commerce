import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function SkeletonThumbnails({ thumbnails }) {
  return Array(thumbnails)
    .fill(0)
    .map((_, id) => (
      <div className="w-[25%]" key={id}>
        <SkeletonBox width={"100%"} height={85} />
      </div>
    ));
}
