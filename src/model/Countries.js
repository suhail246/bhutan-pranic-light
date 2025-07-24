import mongoose from "mongoose";

const countries = new mongoose.Schema(
  {
    code: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Time_zone",
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Pre-save middleware to ensure `status` is always true
countries.pre("save", function (next) {
  this.status = true; // Always set status to true before saving
  next();
});


const CountriesModel =
  mongoose.models.Country || mongoose.model("Country", countries);

export default CountriesModel;
