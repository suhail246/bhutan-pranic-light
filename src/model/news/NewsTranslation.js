import mongoose from "mongoose";

const newsTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News_article",
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const NewsTranslationModel =
  mongoose.models.News_translation ||
  mongoose.model("News_translation", newsTranslationSchema);

export default NewsTranslationModel;
