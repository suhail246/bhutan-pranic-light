import mongoose from "mongoose";

const contactTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
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
    branchName: {
      type: String,
      default: "",
    },
    branchAddress: {
      type: String,
      default: "",
    },
    openingHours: {
      type: Object,
      default: {
        label: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

const ContactTranslationModel =
  mongoose.models.Contact_translation ||
  mongoose.model("Contact_translation", contactTranslationSchema);

export default ContactTranslationModel;
