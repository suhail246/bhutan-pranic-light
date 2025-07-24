import mongoose from "mongoose";

const testimonialTranslationSchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Testimonial",
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
    trim: true,
  },
  designation: {
    type: String,
    default: "",
    trim: true,
  },
  message: {
    type: String,
    default: "",
    trim: true,
  },
});

const TestimonialTranslationModel =
  mongoose.models.Testimonial_translation ||
  mongoose.model("Testimonial_translation", testimonialTranslationSchema);

export default TestimonialTranslationModel;
