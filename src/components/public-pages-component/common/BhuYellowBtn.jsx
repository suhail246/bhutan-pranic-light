const Button = ({ children, variant = "primary" }) => {
  const baseStyles =
    "relative flex items-center px-6 py-3 font-semibold text-white rounded-[5px] hover:transition-all duration-300 ease-in-out bg-origin-border";
  const variantStyles =
    variant === "primary"
      ? "bg-yellow-400 hover:bg-black"
      : "bg-purple-700 hover:bg-gray-600";

  // return (
  //   <button className={`${baseStyles} ${variantStyles}`}>
  //     {children}
  //     {variant === "primary" && (
  //       <span className="absolute -top-2 left-2 w-2 h-2 bg-black rounded-full"></span>
  //     )}
  //   </button>
  // );
  return (
    <button
      className={`w-fit h-[50px] bg-yellow-100 rounded-[10px] relative px-[8px] py-[5px] overflow-hidden group`}
    >
      <span
        className={`relative z-[99] text-black-500 primary-font-family text-[20px] group-hover:text-white transition-all duration-500 ease-in-out`}
      >
        {children}
      </span>
      {/* <span className="w-[30px] h-[30px] rounded-full bg-[#00000030] group-hover:bg-[#ffffff10] absolute top-1/2 left-[8px] -translate-y-1/2 z-[10] transition-all duration-500 ease-in-out border border-red-600"></span> */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[0px] z-[9] bg-[#000] group-hover:w-full transition-all duration-500 ease-in-out" />
    </button>
  );
};
export default Button;
