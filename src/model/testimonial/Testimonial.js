import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    orderNumber: {
      type: String,
      trim: true,
      default: "1",
    },
    rating: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
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

const TestimonialModel =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default TestimonialModel;
