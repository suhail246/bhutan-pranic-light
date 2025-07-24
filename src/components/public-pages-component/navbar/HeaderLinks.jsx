import Link from "next/link";
import { ToggleNavMenuItem } from "..";

const HeaderLinks = () => {
  return (
    <>
      
        <li className="text-yellow-400 cursor-pointer">Home</li>
        <li className="text-yellow-400 cursor-pointer">About</li>
        <li className="text-yellow-400 cursor-pointer">event</li>
        <li className="text-yellow-400 cursor-pointer">register</li>
        <li className="text-yellow-400 cursor-pointer">contact-us</li>
      

      {/* {menuTree.length > 0 &&
        menuTree.map((eachMenu) =>
          eachMenu.children && eachMenu.children.length > 0 ? (
            <ToggleNavMenuItem
              key={eachMenu._id}
              navItemDetails={eachMenu}
              pathname={pathname}
              currentLanguage={currentLanguage}
              enable_sticky_header={enable_sticky_header}
            />
          ) : (
            <li
              key={eachMenu._id}
              className={`${
                pathname === "/"
                  ? enable_sticky_header === 1
                    ? "text-black-500"
                    : "text-[#fff]"
                  : "text-black-500"
              } ${
                pathname === "/" && eachMenu.link === "/"
                  ? "border-b-2 border-orange-500"
                  : pathname.startsWith(eachMenu.link) && eachMenu.link !== "/"
                    ? "border-b-2 border-orange-500"
                    : ""
              } transition-300 text-[15px] hover:text-orange-500 font-candara-rg flex items-center gap-2`}
            >
              <Link
                href={eachMenu.link}
                className="px-[10px] py-[6px] flex items-center gap-[8px]"
              >
                <span>
                  {eachMenu?.name[currentLanguage || "en"] || "Not Found"}
                </span>
              </Link>
            </li>
          )
        )} */}
    </>
  );
};

export default HeaderLinks;
