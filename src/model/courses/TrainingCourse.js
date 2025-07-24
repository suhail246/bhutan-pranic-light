import mongoose from "mongoose";
import { useGenerateSlug, useSlugNanoid } from "../../lib/hooks/index.js";

const trainingCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
    },
    courseStaticId: {
      type: String,
      required: true,
      trim: true,
    },
    orderNumber: {
      type: String,
      required: true,
      trim: true,
      default: "1",
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
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
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
      icon: {
        type: [String],
        default: [],
      },
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
    packageCategoriesSwitch: {
      type: Boolean,
      default: false,
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
      icon: {
        type: [String],
        default: [],
      },
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
    galaryImages: {
      image: {
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
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    metaTitle: {
      type: String,
      trim: true,
      default: function () {
        return this.title
          ? `${this.title} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
          : process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME;
      },
    },
    metaImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    metaKeywords: {
      type: String,
      default: "",
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to handle duplicate keys for title and slug
trainingCourseSchema.pre("save", async function (next) {
  try {
    const course = this;
    const static_course_id = course.courseStaticId;

    if (!static_course_id) {
      course.courseStaticId = course.slug;
    }

    const existingCourse = await mongoose.models.Training_course.find({
      $or: [{ slug: course.slug }, { title: course.title }],
      _id: { $ne: course._id },
    });

    if (existingCourse.length > 0) {
      if (
        existingCourse.some((eachCourse) => eachCourse.slug === course.slug)
      ) {
        course.slug = `${useGenerateSlug(course.title)}-${useSlugNanoid()}`;
      }
      if (
        existingCourse.some((eachCourse) => eachCourse.title === course.title)
      ) {
        course.title = `${course.title} ${useTitleNanoid()}`;
      }
    }

    next();
  } catch (error) {
    console.log("Error in new course pre-save hook: ", error.message);
    next(error);
  }
});

const TrainingCourseModel =
  mongoose.models.Training_course ||
  mongoose.model("Training_course", trainingCourseSchema);

export default TrainingCourseModel;
