import mongoose from "mongoose";
import {
  useGenerateSlug,
  useGenerateTitle,
  useSlugNanoid,
  useTitleNanoid,
} from "../../lib/hooks/index.js";

const allBlogsSchema = new mongoose.Schema(
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
      default: "Untitled Blog",
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
      ref: "Category",
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
allBlogsSchema.pre("save", async function (next) {
  try {
    const blog = this;

    const existingBlog = await mongoose.models.Blog.find({
      $or: [{ slug: blog.slug }, { title: blog.title }],
      _id: { $ne: blog._id },
    });

    if (existingBlog.length > 0) {
      if (existingBlog.some((post) => post.slug === blog.slug)) {
        blog.slug = `${useGenerateSlug(blog.title)}-${useSlugNanoid()}`;
      }
      if (existingBlog.some((post) => post.title === blog.title)) {
        blog.title = `${blog.title} ${useTitleNanoid()}`;
      }
    }

    next();
  } catch (error) {
    console.log("Error in blog pre-save hook: ", error.message);
    next(error);
  }
});

const AllBlogsModel =
  mongoose.models.Blog || mongoose.model("Blog", allBlogsSchema);

export default AllBlogsModel;
