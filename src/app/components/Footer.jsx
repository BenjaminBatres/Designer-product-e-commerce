import Link from "next/link";
import React from "react";
import FooterLinks from "./ui/FooterLinks";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { PiGithubLogoLight } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const categories = [
    { title: "Shop Categories" },
    { link: "Unisex" },
    { link: "Women" },
    { link: "Men" },
  ];

  const collections = [
    { title: "Shop Collections" },
    { link: "Latest arrivals" },
    { link: "urban Oasis" },
    { link: "Cozy comfort" },
    { link: "Fresh Fusion" },
  ];

  const socials = [
    {
      social: <AiOutlineYoutube />,
    },
    {
      social: <FaInstagram />,
    },
    {
      social: <RiFacebookBoxLine />,
    },
    {
      social: <PiGithubLogoLight />,
    },
    {
      social: <FaXTwitter />,
    },
  ];
  
  return (
    <div className="px-4 py-20 lg:p-20">
      <div className="flex flex-col lg:flex-row justify-between mb-13">
        <div>
          <div className="text-xl font-semibold mb-1">Join our newsletter</div>
          <p className="text-gray-500">
            We'll send you a nice letter once per week. No spam.
          </p>
        </div>
        <div className="flex lg:block mt-3 llg:mt-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-[#fafafa] border border-gray-300 px-3 py-2 rounded-sm  w-full lg:w-60"
          />
          <button className="bg-[#4539ca] text-white py-2 px-4 rounded-sm ml-4">
            Subscribe
          </button>
        </div>
      </div>

      <div className="max-w-390 w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="mb-10 lg:mb-0">
            <Link href={"/"} className="text-xl font-semibold">
              StyleNest
            </Link>
            <p className="text-gray-500 mt-8 max-w-85">
              Craft stunning style journeys that weave more joy into every
              thread.
            </p>
          </div>
          <div className="flex justify-between max-w-150 w-full">
            <FooterLinks links={categories} />
            <FooterLinks links={collections} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 mt-12 mb-7"></div>

      <div className="flex gap-8 lg:gap-0 items-center lg:justify-between">
        <div className="text-gray-600">
          &copy; 2026 StyleNest,Inc. All rights reserved.
        </div>
        <div className="flex gap-4 text-xl text-gray-500">
          {socials.map((link, id) => (
            <div key={id} className="cursor-not-allowed">
              {link.social}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
