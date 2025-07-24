import mongoose from "mongoose";
import {
  useGenerateSlug,
  useGenerateTitle,
  useSlugNanoid,
  useTitleNanoid,
} from "../../lib/hooks/index.js";

const allNewsArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
      minlength: [5, "Title must be at least 5 characters long"],
      default: "Untitled News Article",
      set: function (value) {
        return value ? value : this.default;
      },
    },
    slug: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
      minlength: [1, "Slug is required."],
      default: function () {
        return useGenerateSlug(this.title);
      },
      set: function (value) {
        return value ? useGenerateSlug(value) : this.default;
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News_category",
      default: null,
    },
    bannerImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    shortDescription: {
      type: String,
      required: true,
      index: true,
      trim: true,
      minlength: [5, "Short Description must be at least 5 characters long"],
      default: "Short description not provided.",
    },
    description: {
      type: String,
      default: "",
      index: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    source: {
      type: String,
      default: "",
      trim: true,
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
        return this.title
          ? `${this.title} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
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
    metaDescription: {
      type: String,
      trim: true,
      default: function () {
        return this.shortDescription
          ? this.shortDescription
          : "Meta description not provided.";
      },
      set: function (value) {
        return value ? value : this.default;
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to handle duplicate keys for title and slug
allNewsArticleSchema.pre("save", async function (next) {
  try {
    const article = this;

    const existingArticle = await mongoose.models.News_article.find({
      $or: [{ slug: article.slug }, { title: article.title }],
      _id: { $ne: article._id },
    });

    if (existingArticle.length > 0) {
      if (
        existingArticle.some((eachArticle) => eachArticle.slug === article.slug)
      ) {
        article.slug = `${useGenerateSlug(article.title)}-${useSlugNanoid()}`;
      }
      if (
        existingArticle.some(
          (eachArticle) => eachArticle.title === article.title
        )
      ) {
        article.title = `${article.title} ${useTitleNanoid()}`;
      }
    }

    next();
  } catch (error) {
    console.log("Error in new article pre-save hook: ", error.message);
    next(error);
  }
});

const AllNewsArticleModel =
  mongoose.models.News_article ||
  mongoose.model("News_article", allNewsArticleSchema);

export default AllNewsArticleModel;
