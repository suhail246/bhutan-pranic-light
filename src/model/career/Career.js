import mongoose from "mongoose";
import { useGenerateTitle } from "../../lib/hooks/index.js";

const careerSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true,
      trim: true,
    },
    jobDescripton: {
      type: String,
      required: true,
      trim: true,
    },
    jobVacancies: {
      type: String,
      default: "",
      trim: true,
    },
    orderNumber: {
      type: String,
      trim: true,
      default: "1",
    },
    applyLink: {
      type: String,
      default: "#",
      trim: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    metaTitle: {
      type: String,
      trim: true,
      default: function () {
        return this.jobName
          ? `${this.jobName} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
          : process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME;
      },
      set: function (value) {
        return value ? useGenerateTitle(value) : this.default;
      },
    },
    metaImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    metaKeywords: {
      type: String,
      default: "",
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const CareerModel =
  mongoose.models.Career || mongoose.model("Career", careerSchema);

export default CareerModel;
