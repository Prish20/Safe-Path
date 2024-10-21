import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_API_TOKEN;

if (!TOKEN) {
  throw new Error(
    "MAILTRAP_API_TOKEN is not defined in the environment variables."
  );
}

export const mailtrapclient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@christadriansanya.me",
  name: "SafePath",
};
