import Button from "@/components/public-pages-component/common/BhuYellowBtn";

const Newsletter = () => {
  return (
    <div className="w-full max-w-[700px] max-h-[400px] flex flex-col justify-center items-center absolute z-[999] -top-[60%] left-1/2 -translate-x-1/2 translate-y-[80%] bg-[#f9f7f0] rounded-[12px] px-6 py-8 shadow-lg">
      <div className="w-full text-center mb-6">
        <h2 className="primary-font-famliy text-2xl font-bold text-gray-800">
          Subscribe to our Newsletter
        </h2>
        <p className="primary-font-famliy text-semibold text-gray-600 mt-2">
          Get the latest updates and offers directly in your inbox.
        </p>
      </div>

      <form className="w-full flex flex-col sm:flex-row items-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="primary-font-famliy p-3 rounded-md border border-gray-300 flex-1 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 h-[50px]"
        />
        <Button children={"Subscribe"} />
      </form>
    </div>
  );
};

export default Newsletter;
