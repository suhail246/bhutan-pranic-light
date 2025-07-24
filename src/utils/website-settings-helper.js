// Retrieve settings values based on keys and language preference [ADMIN]
export const getSettingsFieldValue = (settings, keyList = [], lang = "") => {
  const values = {};

  keyList.forEach((key) => {
    const fieldData = settings.find((item) => {
      if (!lang || lang === "en") {
        // If `lang` is not provided or is "en", return items with `lang === null`
        return item.key === key && item.lang === null;
      } else {
        // For other `lang` values, return items matching the `lang`
        return item.key === key && item.lang === lang;
      }
    });

    // Assign the value or `""` if no matching field is found
    values[key] = fieldData ? fieldData.value : "";
  });

  return values;
};

// Check if a given string is valid JSON data [ADMIN]
export const isValidJSONData = (data) => {
  if (typeof data !== "string") return false; // Ensure it's a string before parsing
  try {
    const parsedData = JSON.parse(data);
    return typeof parsedData === "object"; // Only return true for objects or arrays
  } catch (error) {
    return false;
  }
};

// Retrieve settings values with automatic JSON parsing for frontend usage [CLIENT]
export const getFESettingsFieldValues = (settings, keyList = [], lang = "") => {
  const values = {};

  keyList.forEach((key) => {
    // Try to find the field with the specified language first
    let fieldData = settings.find(
      (item) => item.key === key && item.lang === lang
    );

    // If not found, fall back to lang === null
    if (!fieldData) {
      fieldData = settings.find(
        (item) => item.key === key && item.lang === null
      );
    }

    // Attempt JSON parsing or return as string
    if (fieldData) {
      try {
        values[key] = JSON.parse(fieldData.value);
      } catch (error) {
        values[key] = fieldData.value; // Return as string if parsing fails
      }
    } else {
      values[key] = ""; // Default empty string if no matching key is found
    }
  });

  return values;
};

// Retrieve file details based on settings value id [CLIENT]
export const getFileSettingsValue = (files, id = "") => {
  const fileData = files.find((item) => item._id === id);

  return fileData || {};
};
