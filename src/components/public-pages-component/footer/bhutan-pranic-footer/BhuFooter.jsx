"use client";
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
import { galleryImages, quickLinks } from "./StaticData";
import Image from "next/image";
import Newsletter from "../../pages/home/bhutan-pranic/GetInTouch";

export default function Footer() {
  return (
    <footer className="relative">
      {/* NewsSelter */}

      <div className="bg-[#f9f7f0] text-[#222] pt-20 px-6 mt-[200px] md:px-20 select-none relative">
        <Newsletter />

        <div className="max-w-[1200px] mx-auto mt-[40px] grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/bhutan-pranic/app-logo/ydf1.png"
                alt="logo"
                className="w-12 h-12 fill-current text-black"
              />
            </div>
            <p className="text-gray-600 mb-6 max-w-[280px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              et sapiente numquam quos explicabo assumenda.
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

          {/* Quick Links */}
          <div>
            <h3 className="primary-font-family font-bold text-[20px] mb-5 select-text">
              Quick Links
            </h3>
            <table className="text-gray-700 w-full">
              <tbody>
                {quickLinks.map(({ label, href }) => (
                  <tr
                    key={label}
                    className="primary-font-family block text-gray-800 hover:text-yellow-400 transition-all duration-300 hover:-translate-y-1 hover:-translate-x-[-5px]"
                  >
                    <td className="py-2 border-b border-transparent hover:border-black select-text">
                      <a href={href} className="block">
                        {label}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="primary-font-family font-bold text-[20px] mb-5 select-text">
              Contact Us
            </h3>
            <ul className="primary-font-family space-y-4 text-gray-700 select-text">
              <li className="flex items-center space-x-3 cursor-pointer hover:text-yellow-400">
                <FaPhoneAlt />
                <span>+974 123 432 432</span>
              </li>
              <li className="flex items-center space-x-3 cursor-pointer hover:text-yellow-400">
                <FaMapMarkerAlt />
                <span>Phobjikha Valley, Bhutan</span>
              </li>
              <li className="flex items-center space-x-3 break-all cursor-pointer hover:text-yellow-400">
                <FaEnvelope />
                <span>info@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 cursor-pointer hover:text-yellow-400">
                <FaGlobe />
                <span>bhutanpranichealing.com</span>
              </li>
            </ul>
          </div>

          {/* Event Gallery */}
          <div>
            <h3 className="primary-font-family font-bold text-[20px] mb-5 select-text">
              Our Recent Event Gallery
            </h3>
            <div className="grid grid-cols-3 gap-3 select-none">
              {galleryImages.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="relative rounded-lg overflow-hidden shadow-sm cursor-pointer"
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-auto rounded-lg object-cover transition duration-300 hover:opacity-60"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6235e323-d21d-498f-8461-51b5f73d2616.png";
                    }}
                  />
                  {/* Overlay Instagram icon on hover for all images */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 -translate-y-4 hover:opacity-100 hover:translate-y-0 transition-all duration-500 bg-black bg-opacity-0.5 rounded-lg">
                    <FaInstagram
                      size={24}
                      className="text-white drop-shadow-lg"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-t-blue-500 mt-14 pt-7 text-center text-gray-600 select-text text-sm mb-[20px]">
          © Copyright 2025 -Bhutan-Pranic. All Right Reserved
        </div>
      </div>
    </footer>
  );
}
