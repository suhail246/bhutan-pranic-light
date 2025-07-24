const InfoSecion = ({ contentData }) => {
  const heading = contentData?.["home-section-2-heading"] || "";
  const description = contentData?.["home-section-2-description"] || "";

  // Required data if any is not provided, return null
  if (!heading && !description) return null;

  return (
    <section
      id="home-page-info-section"
      className="w-full pt-[48px] md:px-[60px] md:pt-[80px] flex flex-col items-center gap-5 md:gap-[50px]"
    >
      {heading && (
        <h1 className="w-full max-w-[889px] text-[28px] md:text-[64px] leading-[34.18px] md:leading-[78.13px] font-candara-rg font-bold text-black-500 text-center">
          {heading}
        </h1>
      )}

      {description && (
        <p className="w-full text-center text-[16px] md:text-[20px] text-black-500 font-candara-rg leading-[19.53px] md:leading-[24.41px]">
          {description}
        </p>
      )}
    </section>
  );
};

export default InfoSecion;
