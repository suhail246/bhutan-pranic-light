import mongoose from "mongoose";

const blogTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
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

const BlogTranslationModel =
  mongoose.models.Blog_translation ||
  mongoose.model("Blog_translation", blogTranslationSchema);

export default BlogTranslationModel;
