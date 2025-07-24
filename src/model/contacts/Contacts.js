import mongoose from "mongoose";
import {
  useGenerateSlug,
  useGenerateTitle,
  useSlugNanoid,
  useTitleNanoid,
} from "../../lib/hooks/index.js";

const contactsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    branchName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [3, "Branch Name must be at least 3 characters long"],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [1, "Slug is required."],
      default: function () {
        return useGenerateSlug(this.branchName);
      },
      set: function (value) {
        return value ? useGenerateSlug(value) : this.default;
      },
    },
    orderNumber: {
      type: String,
      trim: true,
      default: "1",
    },
    branchAddress: {
      type: String,
      default: "",
      trim: true,
    },
    contactNumber: {
      type: String,
      default: "",
      trim: true,
    },
    contactEmail: {
      type: String,
      default: "",
      trim: true,
    },
    openingHours: {
      type: Object,
      default: {
        labels: [],
        values: [],
      },
    },
    latitude: {
      type: String,
      require: true,
      trim: true,
    },
    longitude: {
      type: String,
      require: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isFormActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    metaTitle: {
      type: String,
      trim: true,
      default: function () {
        return this.branchName
          ? `${this.branchName} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
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

// Pre-save hook to handle duplicate keys for branchName and slug
contactsSchema.pre("save", async function (next) {
  try {
    const contact = this;

    const existingContact = await mongoose.models.Contact.find({
      $or: [{ slug: contact.slug }, { branchName: contact.branchName }],
      _id: { $ne: contact._id },
    });

    if (existingContact.length > 0) {
      if (
        existingContact.some((eachContact) => eachContact.slug === contact.slug)
      ) {
        contact.slug = `${useGenerateSlug(contact.branchName)}-${useSlugNanoid()}`;
      }
      if (
        existingContact.some(
          (eachContact) => eachContact.branchName === contact.branchName
        )
      ) {
        contact.branchName = `${contact.branchName} ${useTitleNanoid()}`;
      }
    }

    next();
  } catch (error) {
    console.log("Error in contact pre-save hook: ", error.message);
    next(error);
  }
});

const AllContactsModel =
  mongoose.models.Contact || mongoose.model("Contact", contactsSchema);

export default AllContactsModel;
