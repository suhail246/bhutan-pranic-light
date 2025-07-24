import mongoose from "mongoose";

const filesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileS3Key: {
      type: String,
      required: true,
      defaut: "",
    },
    fileName: {
      type: String,
      required: true,
      index: true,
      defaut: "",
    },
    fileType: {
      type: String,
      required: true,
      index: true,
      defaut: "",
    },
    fileSize: {
      type: Number,
      required: true,
      defaut: 0,
    },
    fileUrl: {
      type: String,
      required: true,
      default: "",
    },
    isDefault: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const FilesModel = mongoose.models.File || mongoose.model("File", filesSchema);

export default FilesModel;
