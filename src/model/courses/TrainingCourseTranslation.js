import mongoose from "mongoose";

const trainingCourseTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training_course",
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    subTitle: {
      type: String,
      default: "",
      trim: true,
    },
    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    buttonLabel: {
      type: String,
      default: "",
      trim: true,
    },
    optionsTitle: {
      type: String,
      default: "",
      trim: true,
    },
    optionsHeading: {
      type: String,
      default: "",
      trim: true,
    },
    optionsSubHeading: {
      type: String,
      default: "",
      trim: true,
    },
    optionsCard: {
      title: {
        type: [String],
        default: [],
      },
      description: {
        type: [String],
        default: [],
      },
    },
    packagesTitle: {
      type: String,
      default: "",
      trim: true,
    },
    packagesHeading: {
      type: String,
      default: "",
      trim: true,
    },
    packagesSubHeading: {
      type: String,
      default: "",
      trim: true,
    },
    packageCategories: {
      type: [String],
      default: [],
    },
    packageFeeStructure: {
      type: Object,
      default: null,
    },
    categoryConditionTitle: {
      type: String,
      default: "",
      trim: true,
    },
    categoryConditionHeading: {
      type: String,
      default: "",
      trim: true,
    },
    categoryConditionDescription: {
      type: String,
      default: "",
      trim: true,
    },
    registrationTitle: {
      type: String,
      default: "",
      trim: true,
    },
    registrationHeading: {
      type: String,
      default: "",
      trim: true,
    },
    registrationCards: {
      title: {
        type: [String],
        default: [],
      },
      description: {
        type: [String],
        default: [],
      },
    },
    trainingHeading: {
      type: String,
      default: "",
      trim: true,
    },
    trainingDetails: {
      title: {
        type: [String],
        default: [],
      },
      description: {
        type: [String],
        default: [],
      },
    },
    faqTitle: {
      type: String,
      default: "",
      trim: true,
    },
    faqHeading: {
      type: String,
      default: "",
      trim: true,
    },
    faqSubHeading: {
      type: String,
      default: "",
      trim: true,
    },
    faqQNA: {
      question: {
        type: [String],
        default: [],
      },
      answer: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

const TrainingCourseTranslationModel =
  mongoose.models.Training_course_translation ||
  mongoose.model(
    "Training_course_translation",
    trainingCourseTranslationSchema
  );

export default TrainingCourseTranslationModel;
