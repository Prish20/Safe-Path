"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    sendResetPasswordEmail: function() {
        return sendResetPasswordEmail;
    },
    sendResetSuccessEmail: function() {
        return sendResetSuccessEmail;
    },
    sendVerificationEmail: function() {
        return sendVerificationEmail;
    },
    sendWelcomeEmail: function() {
        return sendWelcomeEmail;
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
const sendWelcomeEmail = async (email, firstName)=>{
    const recipient = [
        {
            email
        }
    ];
    try {
        const response = await _mailtrapconfig.mailtrapclient.send({
            from: _mailtrapconfig.sender,
            to: recipient,
            template_uuid: "e1eae50b-883f-49ad-870f-d83381b2341e",
            template_variables: {
                name: firstName,
                company_info_name: "Safe Path Platform"
            }
        });
        console.log("Welcome Email sent successfully", response);
    } catch (error) {
        throw new Error(`Error sending email: ${error}`);
    }
};
const sendResetPasswordEmail = async (email, resetURL)=>{
    const recipient = [
        {
            email
        }
    ];
    try {
        const response = await _mailtrapconfig.mailtrapclient.send({
            from: _mailtrapconfig.sender,
            to: recipient,
            subject: "Reset your password",
            html: _eamailTemplate.PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        });
        console.log("Reset Password Email sent successfully", response);
    } catch (error) {
        throw new Error(`Error sending email: ${error}`);
    }
};
const sendResetSuccessEmail = async (email)=>{
    const recipient = [
        {
            email
        }
    ];
    try {
        const response = await _mailtrapconfig.mailtrapclient.send({
            from: _mailtrapconfig.sender,
            to: recipient,
            subject: "Password reset successful",
            html: _eamailTemplate.PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password Reset Success Email sent successfully", response);
    } catch (error) {
        throw new Error(`Error sending email: ${error}`);
    }
};
