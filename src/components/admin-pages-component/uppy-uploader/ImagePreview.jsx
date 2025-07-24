import Image from "next/image";

const ImagePreview = ({ fileKey, url, isSVG, sanitizedSVG }) => {
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
          alt={`File ${fileKey}`}
          fill
          priority
          sizes="(min-width: 576px) 576px, 100vw"
          className={`object-cover transition-opacity duration-300 group-hover:blur-[1px]`}
        />
      )}
    </>
  );
};

export default ImagePreview;
