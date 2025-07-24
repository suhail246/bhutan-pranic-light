export const validateSchema = (schema, data) => {
  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    let zodErrors = {};

    validatedFields.error.issues.forEach((issue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: { message: issue.message },
      };
    });

    return { success: false, errors: zodErrors };
  }

  return { success: true, data: validatedFields.data };
};
