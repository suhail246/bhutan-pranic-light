import mongoose from "mongoose";

const timeZone = new mongoose.Schema(
  {
    timeZone: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    offset: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TimeZoneModel =
  mongoose.models.Time_zone || mongoose.model("Time_zone", timeZone);

export default TimeZoneModel;
