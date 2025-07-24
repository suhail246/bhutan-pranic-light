import mongoose from "mongoose";

const headerMenuTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
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
  },
  {
    timestamps: true,
  }
);

const MenuTranslationModel =
  mongoose.models.Menu_translation ||
  mongoose.model("Menu_translation", headerMenuTranslationSchema);

export default MenuTranslationModel;
