import { globalStyleObj } from "@/app/assets/styles";
import { SwitchButton } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIPermissionCheck } from "@/lib/hooks";
import { ListFilterPlus } from "lucide-react";
import Link from "next/link";
import { RiEditBoxLine } from "react-icons/ri";
import { TbNewSection } from "react-icons/tb";

const EachCMSPageActions = ({
  userId,
  itemDetails,
  permissionItems,
  editRoute,
  sectionUpdateRoute,
  targetType,
  actionFunctions,
  adminRole,
  permissionsList,
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="flex justify-end items-center rounded-full bg-[#000]/10 dark:bg-[#fff]/10 p-2">
          <ListFilterPlus className="size-[16px]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`${globalStyleObj.backgroundLight900Dark200} border dark:border-[#fff]/10 font-poppins-rg text-dark-weight-400 dark:text-light-weight-450 min-w-[150px]`}
      >
        <DropdownMenuLabel className="dark:text-light-weight-800 tracking-wider text-[13px]">
          {itemDetails?.pageName || "Anonymous"} Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Edit Section */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          permissionItems.editItem
        ) && (
          <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
            <span>Edit</span>
            <Link
              href={`${editRoute}/${itemDetails.linkId}`}
              className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
            >
              <RiEditBoxLine size={12} />
            </Link>
          </DropdownMenuItem>
        )}

        {/* Update Page Sections */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          permissionItems.sectionUpdateItem
        ) && (
          <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
            <span>Sections</span>
            <Link
              href={`${sectionUpdateRoute}/${itemDetails.linkId}?tab=section-1`}
              className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
            >
              <TbNewSection size={12} />
            </Link>
          </DropdownMenuItem>
        )}

        {/* Active Status Toggle Switch */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          permissionItems.toggleActiveItem
        ) && (
          <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
            <span>Active</span>
            <SwitchButton
              args={[userId, itemDetails?.linkId || ""]}
              status={itemDetails.isActive}
              apiCallback={actionFunctions.toggleActiveItemFnc}
            />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EachCMSPageActions;
