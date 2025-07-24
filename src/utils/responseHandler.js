import { NextResponse } from "next/server";

export const successResponse = ({ message = null, status = 200, ...args }) => {
  return NextResponse.json(
    {
      success: true,
      message,
      ...args,
    },
    { status }
  );
};

export const errorResponse = ({
  message = null,
  status = 400,
  errors = null,
}) => {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
};
