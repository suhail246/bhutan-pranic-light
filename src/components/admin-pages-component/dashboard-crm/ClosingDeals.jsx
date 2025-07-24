import Image from "next/image";
import Link from "next/link";

import { closingDeals } from "@/app/assets/data/pagesData/dashboardData/crm";
import { globalStyleObj } from "@/app/assets/styles";

const ClosingDeals = () => {
  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Upcoming Activities
        </h4>

        <select className="rounded-[5px] border border-[#000]/20 bg-transparent font-poppins-rg text-[13px] text-dark-weight-500 dark:border-[#fff]/10 dark:text-light-weight-550">
          <option className="bg-white dark:bg-dark-dencity-300" defaultValue="">
            Closed Deals
          </option>
          <option className="bg-white dark:bg-dark-dencity-300" value="1">
            Active Deals
          </option>
          <option className="bg-white dark:bg-dark-dencity-300" value="2">
            Paused Deals
          </option>
          <option className="bg-white dark:bg-dark-dencity-300" value="3">
            Canceled Deals
          </option>
        </select>
      </div>

      <div className="w-full p-3">
        <table className="w-full">
          <thead>
            <tr className="border font-poppins-rg text-[11px] tracking-wide text-dark-weight-500 dark:border-[#fff]/10 dark:text-light-weight-550 sm:text-[13px]">
              <th className="border-r px-2 py-3 text-start dark:border-[#fff]/10">
                Deal Name
              </th>
              <th className="border-r px-2 py-3 text-start dark:border-[#fff]/10">
                Sales Rep
              </th>
              <th className="border-r px-2 py-3 text-start dark:border-[#fff]/10">
                Amount
              </th>
              <th className="px-2 py-3 text-start">Close Date</th>
            </tr>
          </thead>
          <tbody className="font-poppins-rg text-[11px] sm:text-[13px]">
            {(closingDeals || []).map((deal) => (
              <tr
                key={`deal${deal.id}`}
                className="border-b dark:border-[#fff]/10"
              >
                <td className="border-l px-2 py-3 dark:border-[#fff]/10">
                  {deal.dealName}
                </td>
                <td className="flex items-center gap-2 border-x px-2 py-3 dark:border-[#fff]/10">
                  <div className="size-[20px] overflow-hidden rounded-full sm:size-[30px]">
                    <Image
                      src={deal.img}
                      alt={deal.dealName}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <Link href="#">{deal.salesRep}</Link>
                </td>
                <td className="border-r px-2 py-3 dark:border-[#fff]/10">
                  ${deal.amount}k
                </td>
                <td className="border-r px-2 py-3 dark:border-[#fff]/10">
                  {deal.closeDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClosingDeals;
