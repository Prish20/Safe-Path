import { mailtrapclient, sender } from "../config/mailtrap.config";
import { VERIFICATION_EMAIL_TEMPLATE } from "./eamailTemplate";

export const sendVerificationEmail = async (email: string, token: string) => {
  const recipient = [{ email }];

  try {
    await mailtrapclient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
      category: "Email Verification",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error(`Error sending email: ${error}`);
  }
};
