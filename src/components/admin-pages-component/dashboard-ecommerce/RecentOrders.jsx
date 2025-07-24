import Image from "next/image";
import { RiFileList3Line } from "react-icons/ri";

import { recentOrders } from "@/app/assets/data/pagesData/dashboardData/ecommerce";
import { globalStyleObj } from "@/app/assets/styles";
import { RecentOrdersOrderId } from "@/components";

const RecentOrders = () => {
  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Recent Orders
        </h4>

        <button
          type="button"
          className="transition-300 flex items-center gap-1 rounded-[3px] bg-[#299CDB]/20 px-2 py-1 font-poppins-rg text-[11px] text-[#299CDB] hover:bg-[#299CDB] hover:text-white"
        >
          <RiFileList3Line />
          <span>Generate Report</span>
        </button>
      </div>

      <table className="w-full">
        <thead className="border border-dashed border-[#000]/10 bg-[#000]/5 font-poppins-rg text-[11px] text-light-weight-400 dark:border-[#f3f3f3]/5 dark:bg-[#f3f3f3]/5 sm:text-[13px]">
          <tr>
            <th className="hidden py-2 pl-1 text-start sm:inline-block sm:pl-3">
              Order ID
            </th>
            <th className="py-2 pl-1 text-start sm:hidden sm:pl-3">ID</th>
            <th className="py-2 text-start">Customer</th>
            <th className="py-2 text-start">Product</th>
            <th className="py-2 text-start">Amount</th>
            <th className="py-2 text-start">Vender</th>
            <th className="py-2 text-start">Status</th>
            <th className="py-2 pr-1 text-start sm:pr-3">Rating</th>
          </tr>
        </thead>

        <tbody>
          {(recentOrders || []).map((item, index) => (
            <tr
              key={`order-${item.id}`}
              className="font-poppins-rg text-[11px] text-dark-weight-500 dark:text-light-weight-450 sm:text-[13px]"
            >
              <td className="py-3 pl-1 font-poppins-md sm:pl-3">
                <RecentOrdersOrderId value={item.orderId} />
              </td>

              <td className="flex flex-col py-3 sm:gap-1">
                <div className="size-[20px] overflow-hidden rounded-full sm:size-[26px]">
                  <Image
                    src={item.img}
                    alt={item.name}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <span className="hidden sm:inline">{item.name}</span>
              </td>

              <td className="py-3">
                <span className="hidden sm:inline">{item.product}</span>
                <span className="sm:hidden">
                  {item.product.split(" ")[0]}...
                </span>
              </td>

              <td className="py-3 text-[#0AB39C]">
                <span className="hidden sm:inline">${item.amount}.00</span>
                <span className="sm:hidden">${item.amount}</span>
              </td>

              <td className="py-3">
                <span className="hidden sm:inline">{item.vendor}</span>
                <span className="sm:hidden">
                  {item.vendor.split(" ")[0]}...
                </span>
              </td>

              <td className="py-3 font-poppins-sb text-[10px]">
                <span
                  className={`hidden rounded-[5px] p-1 sm:inline ${item.statusClass}`}
                >
                  {item.status}
                </span>
                <div
                  className={`mx-auto size-[10px] rounded-full p-1 sm:hidden ${item.smallStatusClass}`}
                ></div>
              </td>

              <td className="py-3">
                <span className="font-poppins-md">{item.rating}</span>
                <span className="hidden text-[11px] text-light-weight-400 sm:inline">
                  ({item.votes} votes)
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecentOrders;
