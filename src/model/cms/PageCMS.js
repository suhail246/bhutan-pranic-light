import mongoose from "mongoose";

const pageCMSSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    linkId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    metaTitle: {
      type: String,
      trim: true,
      default: function () {
        return this.pageName
          ? `${this.pageName} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
          : process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME;
      },
      set: function (value) {
        return value ? value : this.default;
      },
    },
    metaImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    metaKeywords: {
      type: String,
      trim: true,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

pageCMSSchema.pre("save", function (next) {
  const linkId = this.linkId;
  const slug = this.slug;

  if (!linkId) {
    this.linkId = slug;
  }

  next();
});

const PageCMSModel =
  mongoose.models.Page_cms || mongoose.model("Page_cms", pageCMSSchema);

export default PageCMSModel;
