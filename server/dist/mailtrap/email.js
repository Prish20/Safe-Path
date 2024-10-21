"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sendVerificationEmail", {
    enumerable: true,
    get: function() {
        return sendVerificationEmail;
    }
});
const _mailtrapconfig = require("../config/mailtrap.config");
const _eamailTemplate = require("./eamailTemplate");
const sendVerificationEmail = async (email, token)=>{
    const recipient = [
        {
            email
        }
    ];
    try {
        await _mailtrapconfig.mailtrapclient.send({
            from: _mailtrapconfig.sender,
            to: recipient,
            subject: "Verify your email",
            html: _eamailTemplate.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
            category: "Email Verification"
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error(`Error sending email: ${error}`);
        throw new Error(`Error sending email: ${error}`);
    }
};
