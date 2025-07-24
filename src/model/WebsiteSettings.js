const { default: mongoose } = require("mongoose");

const websiteSetiingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const WebsiteSettingsModel =
  mongoose.models.Website_setting ||
  mongoose.model("Website_setting", websiteSetiingsSchema);

export default WebsiteSettingsModel;
