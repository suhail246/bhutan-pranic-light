import mongoose from "mongoose";

const allPermissionsSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Compound index for optimized searching (only needed if `section` is often queried with `name`)
allPermissionsSchema.index({ section: 1, name: 1 });

allPermissionsSchema.pre("save", async function (next) {
  try {
    const permission = this;

    // Convert name to lowercase and replace spaces with underscores
    permission.name = permission.name
      .replace(/([a-z])([A-Z])/g, "$1_$2") // Handle camelCase
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .toLowerCase(); // Convert to lowercase

    // Check if the name already exists
    const existingPermission = await mongoose.models.Permission.findOne({
      name: permission.name,
    });

    if (existingPermission) {
      return next(
        new Error(`Permission with name "${this.name}" already exists.`)
      );
    }

    next();
  } catch (error) {
    console.log("Error in permission pre-save hook: ", error.message);
    next(error);
  }
});

const PermissionModel =
  mongoose.models.Permission ||
  mongoose.model("Permission", allPermissionsSchema);

export default PermissionModel;
