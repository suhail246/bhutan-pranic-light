import mongoose from "mongoose";

export const pageCMSTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page_cms",
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    pageName: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    content: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const PageCMSTranslationModel =
  mongoose.models.Page_cms_translation ||
  mongoose.model("Page_cms_translation", pageCMSTranslationSchema);

export default PageCMSTranslationModel;
