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

export const sendWelcomeEmail = async (email: string, firstName: string) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapclient.send({
      from: sender,
      to: recipient,
      template_uuid: "e1eae50b-883f-49ad-870f-d83381b2341e",
      template_variables: {
        name: firstName,
        company_info_name: "Safe Path Platform",
      },
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};
