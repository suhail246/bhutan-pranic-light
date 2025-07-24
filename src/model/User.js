import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username must be at most 50 characters long"],
      required: [true, "Username is required"],
      trim: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [15, "Password can't be more than 15 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
      required: [true, "Password is required"],
      trim: true,
    },
    picture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Files",
      default: null,
    },
    role: {
      type: [String],
      default: ["User"],
      enum: ["User", "Admin"],
      index: true,
    },
    adminAsignedRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin_created_role",
      default: null,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
    },
    forgetPasswordCode: {
      type: String,
    },
    forgetPasswordCodeExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Indexes to optimize search performance
userSchema.index({ adminAsignedRole: 1, role: 1 });

// Hash password and accessKey before saving
userSchema.pre("save", async function (next) {
  try {
    const user = this;

    // Hash password only if modified and not already hashed
    if (user.isModified("password") && !user.password.startsWith("$2a$")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    next();
  } catch (error) {
    console.log("Error in user pre-save hook: ", error.message);
    next(error);
  }
});

// NOTE: In Next.js for creating models are different. First we check if there is a model already exists in DB. If not then we create a new model by adding || and create a new collection by mongoose and return it to us. We ahve to check both cases.
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
