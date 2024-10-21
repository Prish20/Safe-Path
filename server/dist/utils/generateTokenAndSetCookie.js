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
        expiresIn: '7d'
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return token;
};
