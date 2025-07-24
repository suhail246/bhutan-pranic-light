import mongoose from "mongoose";

const blogCategoryTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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

const BlogCategoryTranslationModel =
  mongoose.models.Blog_category_translation ||
  mongoose.model("Blog_category_translation", blogCategoryTranslationSchema);

export default BlogCategoryTranslationModel;
