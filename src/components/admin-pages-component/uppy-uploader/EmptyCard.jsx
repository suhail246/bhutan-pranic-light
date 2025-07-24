import { globalStyleObj } from "@/app/assets/styles";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FileIcon, SearchIcon } from "lucide-react";

const EmptyCard = ({
  page,
  totalPages,
  search,
  selectedFileType,
  className,
  ...props
}) => {
  let title;
  let description;
  let Icon;

  if (search || selectedFileType) {
    title = "No files found";
    description = "Try a different search or filter";
    Icon = SearchIcon;
  } else {
    title = page > totalPages ? "No more files to show" : "No files uploaded";
    description = "Upload some files to get started";
    Icon = FileIcon;
  }
  return (
    <Card
      className={`flex w-full h-full flex-col items-center justify-center space-y-6 p-16 ${className} ${globalStyleObj.backgroundLight900Dark300} dark:border-[#fff]/10`}
      {...props}
    >
      <div className="mr-4 shrink-0 rounded-full border border-dashed p-4">
        <Icon
          className="size-5 md:size-8 text-light-weight-400"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <CardTitle className="font-poppins-rg text-[13px] md:text-[15px] text-dark-weight-350 dark:text-light-weight-550 tracking-wider">
          {title}
        </CardTitle>
        <CardDescription className="text-[13px] font-poppins-rg text-light-weight-450">
          {description}
        </CardDescription>
      </div>
    </Card>
  );
};

export default EmptyCard;
