import Button from "@/components/public-pages-component/common/BhuYellowBtn";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import ShineOverlay from "./HeroBgImageOpacity";

export default function EventCard({ src }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="1500"
      data-aos-offset="100"
      className="h-auto bg-white rounded-xl p-6 shadow-sm flex flex-col max-screen-width mx-auto w-[1000px] sm:flex-row items-start gap-6 max-w-6xl"
    >
      {/* Left Image */}
      <div className="rounded-[10px] h-[220px] w-[30%] relative overflow-hidden group">
        <Image
          src={src}
          alt="Home About 3"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />

        {/* Shine overlay */}
        <ShineOverlay hoverContainerSize="group-hover:w-[200%] group-hover:h-[200%]" />
      </div>

      {/* Right Content */}
      <div className="flex flex-col gap-3 mt-3 relative">
        {/* Time and Location */}
        <div className="flex flex-wrap gap-5 text-sm text-gray-600 items-center mt-2">
          <div className="primary-font-family flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#000]" />
            <span>10:00 AM -12:00 PM</span>
          </div>
          <div className="primary-font-family  flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Phobjikha Valley, Bhutan</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="primary-font-family text-[18px] font-bold leading-[32px] tracking-[-0.88px] text-gray-900">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
          tempora!
        </h2>

        {/* Description */}
        <p className="primary-font-family text-gray-600 text-[15px] leading-[26px] max-w-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          cupiditate deleniti ad amet similique praesentium atque, expedita
          ratione
        </p>

        {/* Button */}
        <Button children={"Purschase ticket now"} />
      </div>
    </div>
  );
}
