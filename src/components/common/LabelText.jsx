import { MdGTranslate } from "react-icons/md";

const LabelText = ({
  text,
  htmlForId,
  classNames,
  star = false,
  darkTheme,
  translateField = false,
}) => {
  return (
    <label
      htmlFor={htmlForId}
      className={`${classNames} flex items-center h-fit font-poppins-md text-[13px] text-dark-weight-550 ${darkTheme ? (darkTheme === "NO_DARK" ? "" : "dark:text-light-weight-550") : "dark:text-light-weight-550"}`}
    >
      {translateField && (
        <MdGTranslate size={13} className="mr-[3px] text-red-600" />
      )}
      {text}
      {star && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};

export default LabelText;
