import Image from "next/image";

const PageLoading = () => {
  return (
    <>
      <div className="size-[150px] relative overflow-hidden">
        <Image
          src="/bin-yaber-assets/loading/bin-yaber-loading.gif"
          alt="Loading..."
          fill
          className="object-cover"
        />
      </div>
    </>
  );
};

export default PageLoading;
