import React from "react";

export default function FooterLinks({ links }) {
  return (
    <div>
      {links.map((lnk, id) => (
        <div key={id} className="space-y-2">
          <div className="uppercase text-gray-500">{lnk.title}</div>
          <div className="cursor-not-allowed">{lnk.link}</div>
        </div>
      ))}
    </div>
  );
}
