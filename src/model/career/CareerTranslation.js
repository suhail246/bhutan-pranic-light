import mongoose from "mongoose";

const careerTranslationSchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Career",
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  jobName: {
    type: String,
    default: "",
    trim: true,
  },
  jobDescripton: {
    type: String,
    default: "",
    trim: true,
  },
});

const CareerTranslationModel =
  mongoose.models.Career_translation ||
  mongoose.model("Career_translation", careerTranslationSchema);

export default CareerTranslationModel;
