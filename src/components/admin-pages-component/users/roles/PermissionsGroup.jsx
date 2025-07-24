import { PermissionSwitch, WordFocus } from "@/components";

const PermissionsGroup = ({
  groupPermission,
  handlePermissionChange,
  watchedPermissionIds,
}) => {
  const onFunctionChange = (targetId, status) => {
    handlePermissionChange(targetId, status);
  };

  if (Object.keys(groupPermission).length === 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
        <WordFocus
          sentence="No Permissions"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />

        <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
          Seed permissions to represent the types of users that access your
          applications. Assign permissions to control what users are allowed to
          do in your apps.
        </p>
      </div>
    );
  }

  return (
    <>
      {Object.keys(groupPermission).map((eachPermissionGorup, index) => (
        <div
          key={`${eachPermissionGorup.toLowerCase()}-${index + 1}`}
          className="border dark:border-[#fff]/10 mt-5 rounded-sm"
        >
          <h1 className="text-[13px] text-dark-weight-550 dark:text-light-weight-550 font-poppins-rg border-b dark:border-[#fff]/10 px-3 py-2 bg-[#000]/10 dark:bg-[#fff]/10">
            {eachPermissionGorup
              .split(" ")
              .map(
                (eachWord) =>
                  eachWord[0].toUpperCase() + eachWord.slice(1).toLowerCase()
              )
              .join(" ")}
          </h1>

          <div className="px-3 py-5 flex justify-between sm:justify-normal flex-wrap gap-5">
            {groupPermission[eachPermissionGorup].map((eachPermission) => (
              <div
                key={eachPermission._id}
                className="border border-[#000]/20 dark:border-[#fff]/10 rounded-sm px-3 py-2 flex flex-col gap-3 w-[47%] sm:w-[180px]"
              >
                <span className="text-[12px] text-dark-weight-550 dark:text-light-weight-400 font-poppins-rg">
                  {eachPermission.name
                    .split("_")
                    .map(
                      (each) =>
                        each[0].toUpperCase() + each.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </span>
                <PermissionSwitch
                  targetId={eachPermission._id}
                  onFunctionChange={onFunctionChange}
                  watchedPermissionIds={watchedPermissionIds}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PermissionsGroup;
