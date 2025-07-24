import mongoose from "mongoose";

export const getTranslationDetails = (translationDetails, lang) => {
  return translationDetails?.[lang] || {};
};

export const updateTranslation = async (
  collectionName,
  referenceType,
  referenceId,
  lang,
  data
) => {
  try {
    // Validate referenceId
    if (!mongoose.Types.ObjectId.isValid(referenceId)) {
      return {
        success: false,
        message: "Reference ID is not valid.",
      };
    }

    // Ensure language is provided
    if (!lang || typeof lang !== "string") {
      return {
        success: false,
        message: "Invalid language specified.",
      };
    }

    // Ensure data is not empty
    if (!data || Object.keys(data).length === 0) {
      return {
        success: false,
        message: "No translation data provided.",
      };
    }

    const updatedTranslation = await collectionName.findOneAndUpdate(
      { referenceType, referenceId, lang }, // 🔍 Search criteria (find existing)
      { $set: data }, // 🛠️ Update fields (if found) or create new fields (if inserting)
      { new: true, upsert: true } // ✅ Return the updated document and create if missing
    );

    return {
      success: true,
      status: 200,
      message: `Translation updated successfully.`,
      updatedTranslation,
    };
  } catch (error) {
    console.error(`Error updating translation: ${error}`);
    return { success: false, status: 500, message: "Internal server error." };
  }
};
