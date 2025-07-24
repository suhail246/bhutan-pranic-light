import mongoose from "mongoose";

const headerMenuSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
  parentMenu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    default: null,
  },
  orderNumber: {
    type: String,
    default: "1",
  },
  productMenuStatus: {
    type: Boolean,
    default: false,
  },
  activeStatus: {
    type: Boolean,
    default: true,
  },
});

const HeaderMenuModel =
  mongoose.models.Menu || mongoose.model("Menu", headerMenuSchema);

export default HeaderMenuModel;
