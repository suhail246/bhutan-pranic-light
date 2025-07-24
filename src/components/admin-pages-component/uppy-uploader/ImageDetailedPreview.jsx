import Image from "next/image";

const ImageDetailedPreview = ({ url, filekey, isSVG, sanitizedSVG }) => {
  return (
    <>
      {isSVG ? (
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: sanitizedSVG }}
        />
      ) : (
        <Image
          src={url}
          alt={`File ${filekey}`}
          fill
          sizes="(min-width: 576px) 576px, 100vw"
          priority
          className={`object-cover transition-opacity duration-300 group-hover:blur-[1px]`}
        />
      )}
    </>
  );
};

export default ImageDetailedPreview;
