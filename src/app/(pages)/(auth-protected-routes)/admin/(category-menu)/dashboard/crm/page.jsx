import { crmWidgets } from "@/app/assets/data/pagesData/dashboardData/crm";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  BalanceOverview,
  Breadcrumb,
  ClosingDeals,
  CountupText,
  DealsStatus,
  DealType,
  MyTasks,
  SalesForecast,
  UpcomingActivites,
} from "@/components";

export const metadata = {
  title: titlesObject.crm.title,
};
const DashboardCrm = () => {
  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="CRM" mainParentTab="Dashboards" />
      <div
        className={`mt-[40px] flex w-full flex-col md:flex-row md:flex-wrap ${globalStyleObj.backgroundLight900Dark300} rounded-sm shadow-light`}
      >
        {crmWidgets.map((widget, index) => (
          <div
            key={widget.id}
            className={`flex w-full justify-between gap-2 px-3 py-4 md:max-w-[33.33%] 2xl:max-w-[20%] ${
              index === 1 || index === 3 || index === 4
                ? index === 1
                  ? "border-y dark:border-[#fff]/10 md:border-x md:border-y-0"
                  : index === 4
                    ? "dark:border-[#fff]/10 md:border-x 2xl:border-x-0"
                    : "border-y dark:border-[#fff]/10 md:border-y-0 2xl:border-x"
                : ""
            }`}
          >
            <div>
              <h4
                className={`mb-3 font-poppins-md text-[13px] uppercase text-light-weight-400`}
              >
                {widget.label}
              </h4>
              <div className="flex items-center gap-5">
                {widget.icon}
                <h1 className="font-poppins-md text-[26px] text-dark-weight-550 dark:text-light-weight-550">
                  <CountupText
                    number={widget.number}
                    decimals={widget.decimals}
                    suffix={widget.suffix}
                    prefix={widget.prefix}
                  />
                </h1>
              </div>
            </div>
            {widget.badge}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-5 2xl:flex-row">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div
            className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
          >
            <SalesForecast />
          </div>

          <div
            className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
          >
            <DealType />
          </div>
        </div>

        <div
          className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
        >
          <BalanceOverview />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5 xl:flex-row">
        <div
          className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light xl:min-w-[60%]`}
        >
          <DealsStatus />
        </div>

        <div
          className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
        >
          <MyTasks />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5 2xl:flex-row">
        <div
          className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
        >
          <UpcomingActivites />
        </div>

        <div
          className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
        >
          <ClosingDeals />
        </div>
      </div>
    </div>
  );
};

export default DashboardCrm;
