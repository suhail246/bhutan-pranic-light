import mongoose from "mongoose";

const adminCreatedRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true, // Ensures uniqueness at the DB level
      trim: true,
      index: true, // Improves query performance if frequently searched
      validate: {
        validator: (value) => value.length >= 3 && value.length <= 100,
        message: "Role name must be between 3 and 100 characters long",
      },
    },
  },
  { timestamps: true }
);

const AdminCreatedRoleModel =
  mongoose.models.Admin_created_role ||
  mongoose.model("Admin_created_role", adminCreatedRoleSchema);

export default AdminCreatedRoleModel;
