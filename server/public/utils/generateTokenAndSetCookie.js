"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateTokenAndSetCookie", {
    enumerable: true,
    get: function() {
        return generateTokenAndSetCookie;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const generateTokenAndSetCookie = (res, userId)=>{
    const token = _jsonwebtoken.default.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? 'vercel.app' : undefined
    });
    return token;
};
