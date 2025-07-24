const sponsors = [
  { name: "Boltshift", logo: "/bhutan-pranic/brand-img1.png" },
  { name: "Lightbox", logo: "/bhutan-pranic/brand-img2.png" },
  { name: "GlobalBank", logo: "/bhutan-pranic/brand-img3.png" },
  { name: "FeatherDev", logo: "/bhutan-pranic/brand-img4.png" },
  { name: "Acme Corp", logo: "/bhutan-pranic/brand-img5.png" },
  { name: "Polymath", logo: "/bhutan-pranic/brand-img6.png" },
  { name: "Nietzsche", logo: "/bhutan-pranic/brand-img7.png" },
  { name: "Epicurious", logo: "/bhutan-pranic/brand-img8.png" },
];

export default function SponsorsSection() {
  return (
    <section className="bg-[#fdfbf7] py-16 px-4">
      <div
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="1500"
        data-aos-offset="100"
        className="text-center mb-10"
      >
        <span className="primary-font-family uppercase text-sm font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-[10px] w-fit">
          OUR SPONSORS
        </span>
        <h2 className="primary-font-family text-3xl md:text-4xl font-bold mt-4">
          Our Official Sponsors
        </h2>
      </div>

      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1500"
        data-aos-offset="100"
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {sponsors.map((sponsor, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer flex items-center justify-center"
          >
            <img
              src={sponsor.logo}
              lt={sponsor.name}
              className="h-8 md:h-10 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
