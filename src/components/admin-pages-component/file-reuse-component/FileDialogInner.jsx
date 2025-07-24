"use client";

import { ImagePreview, PillTooltip, VideoPreview } from "@/components";
import { Deleting } from "@/lib/helpers/Spinner";
import DOMPurify from "dompurify";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";

// Select Button
const SelectButton = ({
  fileId,
  isImage,
  isSVG,
  selectedFileId,
  onSelectId,
  fileName,
}) => {
  return (
    <>
      {(isImage || isSVG) && (
        <button
          type="button"
          onClick={() => onSelectId(fileId, fileName)}
          className="absolute top-2 right-2 rounded-md shadow-md transition-opacity duration-300 ease-in-out dark:bg-white dark:border-[#fff]/10 p-2 cursor-pointer bg-white/50 hover:bg-white dark:bg-white/50 dark:hover:bg-[#fff]"
        >
          {selectedFileId && selectedFileId === fileId ? (
            <MdCheckCircle className="text-green-500 size-[16px]" />
          ) : (
            <MdOutlineRadioButtonUnchecked className="text-blue-500 size-[16px]" />
          )}
        </button>
      )}
    </>
  );
};

// NOTE Main Component
const FileDialogInner = ({
  fileId,
  fileKey,
  fileName,
  contentType,
  size,
  url,
  userId,
  selectedFileId,
  onSelectId,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [sanitizedSVG, setSanitizedSVG] = useState(null);

  const router = useRouter();
  const isImage = contentType.startsWith("image/");
  const isSVG = contentType.startsWith("image/svg+xml");
  const isVideo = contentType.startsWith("video/");

  useEffect(() => {
    const fetchAndSanitizeSVG = async () => {
      try {
        const svgResponse = await fetch(url);
        const rawSVG = await svgResponse.text();
        const cleanSVG = DOMPurify.sanitize(rawSVG, {
          USE_PROFILES: { svg: true, html: false },
        });

        setSanitizedSVG(cleanSVG);
      } catch (error) {
        console.log(`Error in fetching SVG CLIENT: ${error}`);
      }
    };

    if (isSVG) fetchAndSanitizeSVG();
  }, [url, isSVG]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-gray-200 border dark:border-[#fff]/10 group shadow-sm">
      {isDeleting ? (
        <Deleting />
      ) : (
        <>
          {isImage ? (
            <ImagePreview
              fileKey={fileKey}
              url={url}
              isSVG={isSVG}
              sanitizedSVG={sanitizedSVG}
            />
          ) : isVideo ? (
            <VideoPreview fileKey={fileKey} url={url} type={contentType} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <FileIcon className="w-10 h-10 text-dark-weight-550" />
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-2 w-full">
            <PillTooltip
              name={fileName}
              contentType={contentType}
              size={size}
            />
          </div>
          <SelectButton
            fileId={fileId}
            isImage={isImage}
            isSVG={isSVG}
            selectedFileId={selectedFileId}
            onSelectId={onSelectId}
            fileName={fileName}
          />
        </>
      )}
    </div>
  );
};

export default FileDialogInner;
