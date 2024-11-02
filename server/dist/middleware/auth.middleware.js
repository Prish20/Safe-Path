"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "verifyToken", {
    enumerable: true,
    get: function() {
        return verifyToken;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const verifyToken = (req, res, next)=>{
    try {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(401).json({
                message: 'Unauthorized'
            });
            return;
        }
        const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token'
        });
        return;
    }
};
