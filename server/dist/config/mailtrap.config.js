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
    mailtrapclient: function() {
        return mailtrapclient;
    },
    sender: function() {
        return sender;
    }
});
const _mailtrap = require("mailtrap");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
const TOKEN = process.env.MAILTRAP_API_TOKEN;
if (!TOKEN) {
    throw new Error("MAILTRAP_API_TOKEN is not defined in the environment variables.");
}
const mailtrapclient = new _mailtrap.MailtrapClient({
    token: TOKEN
});
const sender = {
    email: "hello@christadriansanya.me",
    name: "SafePath"
};
