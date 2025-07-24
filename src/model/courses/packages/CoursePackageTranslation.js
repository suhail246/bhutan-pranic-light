import mongoose from "mongoose";

const trainingCoursePackageTranslationSchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Training_course_package",
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  coursePackageType: {
    type: String,
    trim: true,
    default: "",
  },
  packageTitle: {
    type: String,
    trim: true,
    default: "",
  },
  packageTerms: {
    type: String,
    trim: true,
    default: "",
  },
  packageTagName: {
    type: String,
    trim: true,
    default: "",
  },
  packageButtonLabel: {
    type: String,
    trim: true,
    default: "",
  },
  packageFeaturesTitle: {
    type: String,
    trim: true,
    default: "",
  },
  packageFeatures: {
    title: {
      type: [String],
      default: [],
    },
  },
});

const TrainingCoursePackageTranslationModel =
  mongoose.models.Training_course_package_translation ||
  mongoose.model(
    "Training_course_package_translation",
    trainingCoursePackageTranslationSchema
  );

export default TrainingCoursePackageTranslationModel;
