import { globalStyleObj } from "@/app/assets/styles";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormateFileSize } from "@/lib/hooks";

const PillTooltip = ({ name, contentType, size }) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-[#000] bg-opacity-50 px-3 py-1 rounded-full w-[60%] hover:cursor-pointer">
          <span className="block truncate text-[12px] font-poppins-rg text-white">
            {name}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={`max-w-[300px] z-[99] ${globalStyleObj.backgroundLight900Dark200}`}
      >
        <ul className="text-[12px] font-poppins-rg text-dark-weight-400 dark:text-light-weight-450 space-y-1">
          <li>
            <strong className="dark:text-white">Name:</strong> {name}
          </li>
          <li>
            <strong className="dark:text-white">Type:</strong> {contentType}
          </li>
          <li>
            <strong className="dark:text-white">Size:</strong>{" "}
            {useFormateFileSize(size)}
          </li>
        </ul>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default PillTooltip;
