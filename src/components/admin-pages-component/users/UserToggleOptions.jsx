import { globalStyleObj } from "@/app/assets/styles";
import { DeleteUserButton } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";
import { ListFilterPlus } from "lucide-react";
import Link from "next/link";

const UserToggleOptions = ({ userId, user, adminRole, permissionsList }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="flex justify-end items-center rounded-full bg-[#000]/10 dark:bg-[#fff]/10 p-2">
          <ListFilterPlus
            size={16}
            className="text-dark-weight-400 dark:text-light-weight-800"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`${globalStyleObj.backgroundLight900Dark200} border dark:border-[#fff]/10 font-poppins-rg text-dark-weight-400 dark:text-light-weight-450 min-w-[150px]`}
      >
        {/* View User Details */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          PERMISSIONS.STAFF.EDIT_STAFF
        ) && (
          <DropdownMenuItem className="p-0 mb-1">
            <Link
              href={ROUTES.ADMIN_STAFF_UPDATE(user._id)}
              className="flex items-center justify-between gap-3 text-[13px] text-dark-weight-550 dark:text-light-weight-400 bg-[#000]/5 dark:bg-[#fff]/5 p-2 w-full rounded-sm"
            >
              <span>View Details</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* Delete Section */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          PERMISSIONS.STAFF.DELETE_STAFF
        ) && (
          <DropdownMenuItem className="p-0">
            <DeleteUserButton sessionId={userId} targetDetails={user} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserToggleOptions;
