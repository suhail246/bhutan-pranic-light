import { SelectItem } from "@/components/ui/select";

const renderOptions = (categoryList, level = 0) => {
  return categoryList.map(
    (category) =>
      category.activeStatus && (
        <div key={category._id}>
          <SelectItem
            value={category._id}
            disabled={category.isDefault}
            className={`${category.parentCategoryId === null ? "text-[14px] bg-green-500/10 font-poppins-md" : "text-[12px]"} font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer`}
          >
            {"- ".repeat(level)} {category?.name?.en || "Anonymous"}{" "}
            {category.isDefault && (
              <span className="text-[10px] bg-red-500/20 rounded-full font-poppins-md text-red-600 px-2 py-0.5 ml-2">
                Default
              </span>
            )}
          </SelectItem>

          {category.children.length > 0 &&
            renderOptions(category.children, level + 1)}
        </div>
      )
  );
};

const RenderCategoryOptions = ({ categoryList }) => {
  return <>{renderOptions(categoryList)}</>;
};

export default RenderCategoryOptions;
