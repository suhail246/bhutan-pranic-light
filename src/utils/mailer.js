import nodemailer from "nodemailer";

import {
  resetPasswordTokenEmailTemplate,
  verificationEmailTemplate,
} from "../lib/templates/emails/mail-html-templates";

import UserModel from "@/model/User";

// NOTE: Nodemailer transporter with MailTrap SMTP
export const mailTransport = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
};

// NOTE: 4 digits OTP generator
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Ex - 1000 + 0.6789 * 9000
};

// NOTE: Verification email function
export const sendEmail = async ({ email, emailType, username, userId }) => {
  try {
    // INFO: Create tokenCode and save in DB according to email type
    const otp = generateOTP();

    if (emailType === "VERIFY" || emailType === "RESEND") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyCode: otp,
        verifyCodeExpiry: Date.now() + 3600000, // 1hr
      }).exec();
    } else if (emailType === "RESET") {
      await UserModel.findByIdAndUpdate(userId, {
        forgetPasswordCode: otp,
        forgetPasswordCodeExpiry: Date.now() + 3600000, // 1hr
      }).exec();
    }

    // INFO: Nodemailer transporter with MailTrap SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // INFO: Mail Options
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject:
        emailType === "VERIFY" || emailType === "RESEND"
          ? "Velzon Email Verification Code"
          : "Velzon Password Reset Code",
      html:
        emailType === "VERIFY" || emailType === "RESEND"
          ? verificationEmailTemplate({ otp, username })
          : resetPasswordTokenEmailTemplate({ otp, username }),
    };

    // INFO: Email Response
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    // Error Response
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
};
