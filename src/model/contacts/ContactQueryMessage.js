import mongoose from "mongoose";

const contactQueryMessageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    problemDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AllContactQueryMessageModel =
  mongoose.models.Contact_query_message ||
  mongoose.model("Contact_query_message", contactQueryMessageSchema);

export default AllContactQueryMessageModel;
