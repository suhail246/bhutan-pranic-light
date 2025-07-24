export const makePermissionsGroup = (permissionsList) => {
  const group = permissionsList.reduce((acc, permission) => {
    const { section } = permission;

    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(permission);
    return acc;
  }, {});

  return group;
};

export const makeSelectedPermissionIdsList = (selectedPermissions) => {
  const list = selectedPermissions.map(
    (permission) => permission.permissionId._id
  );
  return list;
};

export const parentPermissionCheck = (requireList, permissionList) => {
  if (!requireList) return true;
  const status = requireList.some((item) => permissionList.includes(item));

  return status;
};

export const childPermissionCheck = (requirePermission, permissionList) => {
  if (!requirePermission) return true;
  const status = permissionList.includes(requirePermission);

  return status;
};
