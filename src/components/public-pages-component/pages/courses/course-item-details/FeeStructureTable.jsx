import { useTranslations } from "next-intl";

const FeeStructureTable = ({ detailsData = {} }) => {
  const translate = useTranslations();

  const feeServices = detailsData?.packageFeeStructure?.services || [];
  const feeAmounts = detailsData?.packageFeeStructure?.amounts || [];

  if (feeServices.length === 0 || feeAmounts.length === 0) {
    return null;
  }

  const getTotalAmount = (amounts) => {
    return amounts
      .map((amount) => parseFloat(amount)) // Convert strings to numbers
      .filter((amount) => !isNaN(amount)) // Remove NaN values
      .reduce((sum, amount) => sum + amount, 0) // Sum the numbers
      .toFixed(2); // Format to 2 decimal places
  };

  return (
    <table className="w-full md:max-w-[781px] md:mx-auto mt-[28px] md:mt-[32px]">
      <thead>
        <tr>
          <th className="w-1/2 text-left text-white text-[20px] font-candara-rg font-bold px-[16px] py-[14px] bg-orange-500 rounded-tl-[12px] rounded-bl-[12px] rtl:text-right rtl:rounded-tl-none rtl:rounded-bl-none rtl:rounded-tr-[12px] rtl:rounded-br-[12px]">
            {translate("Services")}
          </th>
          <th className="w-1/2 text-left text-white text-[20px] font-candara-rg font-bold px-[16px] py-[14px] bg-orange-500 rounded-tr-[12px] rounded-br-[12px] rtl:text-right rtl:rounded-tr-none rtl:rounded-br-none rtl:rounded-tl-[12px] rtl:rounded-bl-[12px]">
            {translate("Amount (AED)")}
          </th>
        </tr>
      </thead>

      <tbody>
        {feeServices.map((service, index) => (
          <tr
            key={`fee-structure-${index + 1}`}
            className="border-b border-black-100 last:border-b-0"
          >
            <td className="p-4 text-[16px] font-candara-rg text-black-500">
              {service}
            </td>
            <td className="p-4 text-[16px] font-candara-rg text-black-500">
              {feeAmounts[index]}
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td className="p-4 text-[16px] text-black-500 font-candara-rg font-bold bg-white rounded-tl-[12px] rounded-bl-[12px] border-t border-b border-black-100">
            {translate("Total")}
          </td>
          <td className="p-4 text-[16px] text-black-500 font-candara-rg font-bold bg-white rounded-tr-[12px] rounded-br-[12px] border-t border-b border-black-100">
            {getTotalAmount(feeAmounts)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default FeeStructureTable;
