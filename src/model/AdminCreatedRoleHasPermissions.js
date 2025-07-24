import mongoose from "mongoose";

const adminCreatedRoleHasPermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin_created_role",
      required: [true, "Role ID is required"],
      index: true,
    },
    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: [true, "Permission ID is required"],
      index: true,
    },
  },
  { timestamps: true }
);

const AdminCreatedRoleHasPermissionModel =
  mongoose.models.Admin_created_role_has_permission ||
  mongoose.model(
    "Admin_created_role_has_permission",
    adminCreatedRoleHasPermissionSchema
  );

export default AdminCreatedRoleHasPermissionModel;
