import mongoose from "mongoose";
import {
  useGenerateSlug,
  useSlugNanoid,
  useTitleNanoid,
} from "../../lib/hooks/index.js";

const newsCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      default: "Untitled News Category",
      set: function (value) {
        return value ? value : this.default;
      },
    },
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
      minlength: [1, "Slug is required."],
      default: function () {
        return useGenerateSlug(this.name);
      },
      set: function (value) {
        return value ? useGenerateSlug(value) : this.default;
      },
    },
    description: {
      type: String,
      default: "",
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    metaTitle: {
      type: String,
      trim: true,
      default: function () {
        return this.name
          ? `${this.name} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
          : process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME;
      },
    },
    metaImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to handle duplicate keys for name and slug
newsCategorySchema.pre("save", async function (next) {
  try {
    const category = this;

    const existingCategory = await mongoose.models.News_category.find({
      $or: [{ slug: category.slug }, { name: category.name }],
      _id: { $ne: category._id },
    });

    if (existingCategory.length > 0) {
      if (existingCategory.some((item) => item.slug === category.slug)) {
        category.slug = `${useGenerateSlug(category.name)}-${useSlugNanoid()}`;
      }
      if (existingCategory.some((item) => item.name === category.name)) {
        category.name = `${category.name} ${useTitleNanoid()}`;
      }
    }

    next();
  } catch (error) {
    console.log("Error in news category pre-save hook: ", error.message);
    next(error);
  }
});

const AllNewsCategoryModel =
  mongoose.models.News_category ||
  mongoose.model("News_category", newsCategorySchema);

export default AllNewsCategoryModel;
