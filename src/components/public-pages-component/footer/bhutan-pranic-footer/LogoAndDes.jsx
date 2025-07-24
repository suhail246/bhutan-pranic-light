import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

const LogoAndDes = () => {
  return (
    <div>
      <div className="relative w-[30px] h-[30px] overflow-hidden rounded-full">
        <Image
          src="/bhutan-pranic/app-logo/app-logo.jpg"
          alt=""
          fill
          priority //(This use only where the your image is in most priority level)
          quality={100}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-contain" //(Set object-contain || object-cover according to it)
        />

        <h2 className="ml-3 font-bold text-xl select-text">BHU</h2>
      </div>
      <p className="text-gray-600 mb-6 max-w-[280px]">
        We are committed to creating a platform where business leaders,
        innovators, and professionals can come together to exchange ideas
      </p>
      <div className="flex space-x-4">
        <a
          href="#"
          aria-label="Facebook"
          className="bg-gray-200 hover:bg-[#FFBA00] transition duration-300 rounded-full w-10 h-10 flex items-center justify-center text-black"
        >
          <FaFacebookF size={16} />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="bg-gray-200 hover:bg-[#FFBA00] transition duration-300 rounded-full w-10 h-10 flex items-center justify-center text-black relative"
        >
          <FaInstagram size={16} />
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          className="bg-gray-200 hover:bg-[#FFBA00] transition duration-300 rounded-full w-10 h-10 flex items-center justify-center text-black font-semibold"
        >
          <FaLinkedinIn size={16} />
        </a>
        <a
          href="#"
          aria-label="Pinterest"
          className="bg-gray-200 hover:bg-[#FFBA00] transition duration-300 rounded-full w-10 h-10 flex items-center justify-center text-black font-semibold"
        >
          <FaPinterestP size={16} />
        </a>
      </div>
    </div>
  );
};

export default LogoAndDes;
