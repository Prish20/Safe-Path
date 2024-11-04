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
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized. Please login."
        });
        return;
    }
    try {
        const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "string" || !decoded) {
            res.status(401).json({
                success: false,
                message: "Unauthorized. Please login."
            });
            return;
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized. Please login."
        });
    }
};
