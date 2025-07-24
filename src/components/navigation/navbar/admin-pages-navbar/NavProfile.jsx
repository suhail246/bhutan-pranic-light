"use client";

import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle, MdLogout } from "react-icons/md";

import avatarImg from "../../../../app/assets/images/users/avatar-1.jpg";

import { handleSessionLogout } from "@/actions/authActions/sessionLogout";
import {
  avatarStatus,
  topbarColor,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ROUTES from "@/constants/routes";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { signOut } from "next-auth/react";

const NavProfile = ({ userDetails }) => {
  const isAuthenticated = Object.keys(userDetails).length > 0;
  const { sidebarUserProfileAvtarType, topbarColorType } = useAppSelector(
    (state) => state.layout
  );

  // Handle Logout for OAuth Login
  const handleOAuthLogout = async () => {
    const { success, message } = await handleSessionLogout();

    if (success) {
      useSuccessToast(message);
      signOut({
        callbackUrl: ROUTES.HOME,
      });
    } else {
      useErrorToast(message);
    }
  };

  if (sidebarUserProfileAvtarType === avatarStatus.SHOW) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          asChild
          className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/5` : `bg-[#fff]/5`} h-full cursor-pointer px-4 sm:ml-2`}
        >
          <div className={`${globalStyleObj.flexStart} gap-[10px]`}>
            <div className="relative size-[33px] rounded-full">
              <Image
                alt="User settings"
                src={
                  isAuthenticated
                    ? userDetails?.picture?.fileUrl || avatarImg
                    : avatarImg
                }
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="rounded-full"
              />
            </div>
            <div className="hidden xl:flex xl:flex-col font-poppins-rg">
              <span
                className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.text13Light550Dark550}` : `font-poppins-rg text-[13px] text-light-weight-850`}`}
              >
                {isAuthenticated
                  ? userDetails?.username || "Anonymous"
                  : "Anonymous"}
              </span>
              <span className={`${globalStyleObj.text11Light400}`}>
                {isAuthenticated
                  ? userDetails?.adminAsignedRole?.name || "Anonymous"
                  : "Anonymous"}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          className={`${globalStyleObj.backgroundLight900Dark200} border-none px-3 py-2`}
        >
          <DropdownMenuLabel>
            <span className="font-poppins-light text-[12px] tracking-wide text-light-weight-400">
              {`Welcome ${isAuthenticated ? userDetails?.username || "Anonymous" : "Anonymous"}`}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link href={ROUTES.ADMIN_PROFILE}>
              <DropdownMenuItem className="cursor-pointer">
                <MdAccountCircle size={16} color="#878a99" />
                <span className={`${globalStyleObj.text13Light600Dark400}`}>
                  Profile
                </span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onClick={handleOAuthLogout}
              className="cursor-pointer"
            >
              <MdLogout size={16} color="#878a99" />
              <span className={`${globalStyleObj.text13Light600Dark400}`}>
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return null;
  }
};

export default NavProfile;
