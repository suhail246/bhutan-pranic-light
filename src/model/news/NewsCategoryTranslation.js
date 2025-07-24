import mongoose from "mongoose";

const newsCategoryTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News_category",
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const NewsCategoryTranslationModel =
  mongoose.models.News_category_translation ||
  mongoose.model("News_category_translation", newsCategoryTranslationSchema);

export default NewsCategoryTranslationModel;
