import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    app_lang_code: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    rtl: {
      type: Boolean,
      required: true,
      default: false,
    },
    default: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const LanguagesModel =
  mongoose.models.Language || mongoose.model("Language", languageSchema);

export default LanguagesModel;
