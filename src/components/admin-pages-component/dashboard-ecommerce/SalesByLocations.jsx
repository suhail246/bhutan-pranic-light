import { VectorMap } from "@south-paw/react-vector-maps";

import world from "../../../app/assets/jsonData/world.svg.json";

import { salesByLocationsData } from "@/app/assets/data/pagesData/dashboardData/ecommerce";
import { globalStyleObj } from "@/app/assets/styles";
import { CustomExportButton, ProgressBar } from "@/components";

const SalesByLocations = () => {
  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Sales by Locations
        </h4>
        <CustomExportButton />
      </div>

      <div className="p-3">
        <VectorMap
          {...world}
          className="mx-auto max-w-[300px] fill-slate-300 dark:fill-zinc-700"
        />
      </div>

      <div className="px-3 pb-5">
        {(salesByLocationsData || []).map((sales) => (
          <div key={`sales${sales.id}`}>
            <p className="my-3 flex items-center justify-between gap-2 font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550">
              <span>{sales.country}</span>
              <span>{sales.percentage}</span>
            </p>
            <ProgressBar value={sales.value} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SalesByLocations;
