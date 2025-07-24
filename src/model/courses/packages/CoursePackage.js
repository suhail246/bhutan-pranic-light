import mongoose from "mongoose";

const trainingCoursePackageSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training_course",
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      trim: true,
      default: "1",
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
    packagePrice: {
      type: String,
      trim: true,
      default: "",
    },
    packageTerms: {
      type: String,
      trim: true,
      default: "",
    },
    packageTagIcon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
      set: (value) => (value && value.trim() !== "" ? value : null),
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
    packageButtonLink: {
      type: String,
      trim: true,
      default: "#",
    },
    packageFeaturesTitle: {
      type: String,
      trim: true,
      default: "",
    },
    packageFeaturesIcon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
      set: (value) => (value && value.trim() !== "" ? value : null),
    },
    packageFeatures: {
      title: {
        type: [String],
        default: [],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TrainingCoursePackageModel =
  mongoose.models.Training_course_package ||
  mongoose.model("Training_course_package", trainingCoursePackageSchema);

export default TrainingCoursePackageModel;
