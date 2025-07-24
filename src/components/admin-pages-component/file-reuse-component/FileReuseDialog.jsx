"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { FileDialogContent } from "@/components";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const FileReuseDialog = ({
  htmlId,
  userId,
  filesList,
  allFiles = [],
  paginationDetails,
  searchValue,
  selectedFileType,
  onChangeBannerImage,
  onChangeMetaImage,
  selectedBannerFileId,
  selectedBannerFileName,
  selectedMetaFileId,
  selectedMetaFileName,
  adminRole,
  permissionsList,
}) => {
  const [name, setName] = useState(
    selectedBannerFileName ||
      selectedMetaFileName ||
      allFiles.find(
        (file) =>
          file._id === selectedBannerFileId || file._id === selectedMetaFileId
      )?.fileName ||
      ""
  );

  const [selectedId, setSelectedId] = useState(
    selectedBannerFileId || selectedMetaFileId || ""
  );

  // Handle File Selection Fnction
  const onSelectFile = (id, name) => {
    setName(name);
    setSelectedId(id);

    if (onChangeMetaImage && id) {
      onChangeMetaImage(id);
    }
    if (onChangeBannerImage && id) {
      onChangeBannerImage(id);
    }
  };

  // Handle File De-Select Fnction
  const handleOnDeselectImage = () => {
    setSelectedId("");
    setName("");

    if (onChangeMetaImage) {
      onChangeMetaImage("");
    }
    if (onChangeBannerImage) {
      onChangeBannerImage("");
    }
  };

  return (
    <>
      <Dialog id={htmlId}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center gap-5 rounded-md overflow-hidden text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-450 border border-[#000]/20 dark:border-[#fff]/10 dark:bg-[#000]/10"
          >
            <p className="bg-[#000]/10 dark:bg-[#fff]/20 px-3 py-[10px] text-dark-weight-550 dark:text-light-weight-400 border-r border-[#000]/20 dark:border-[#fff]/10">
              Browse
            </p>
            <p>{name ? name : "No file chosen"}</p>
          </button>
        </DialogTrigger>
        <DialogContent
          className={`max-w-[90%] max-h-fit z-[99] ${globalStyleObj.backgroundLight900Dark300}`}
        >
          <FileDialogContent
            userId={userId}
            filesList={filesList}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onSelectFile={onSelectFile}
            selectedBannerFileId={selectedBannerFileId}
            selectedMetaFileId={selectedMetaFileId}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        </DialogContent>
      </Dialog>

      {selectedId && (
        <div className="w-[180px] h-[100px] relative mt-1 rounded-sm overflow-hidden group border border-[#000]/20 dark:border-[#fff]/10">
          <Image
            src={
              allFiles?.find((file) => file._id === selectedId)?.fileUrl ||
              "/assets/error400-cover.png"
            }
            alt={
              allFiles?.find((file) => file._id === selectedId)?.fileName ||
              "Anonymous"
            }
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 60vw"
            className="object-cover"
          />
          <button
            onClick={handleOnDeselectImage}
            className="hidden transition-300 size-[40px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-red-500/50 rounded-full p-1 group-hover:flex items-center justify-center hover:bg-red-500/70"
          >
            <MdClose size={18} color="#fff" />
          </button>
        </div>
      )}
    </>
  );
};

export default FileReuseDialog;
