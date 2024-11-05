"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _authcontrollers = require("../controllers/auth.controllers.js");
const _verifyToken = require("../middlewares/verifyToken.js");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Check auth status route
router.get("/check-auth", _verifyToken.verifyToken, _authcontrollers.checkAuth);
// Authentication routes
router.post("/signup", _authcontrollers.signup);
router.post("/signin", _authcontrollers.signin);
router.post("/google", _authcontrollers.googleSignIn);
router.post("/signout", _authcontrollers.signout);
router.post("/verify-email", _authcontrollers.verifyEmail);
router.post("/forgot-password", _authcontrollers.forgotPassword);
router.post("/reset-password/:token", _authcontrollers.resetPassword);
const _default = router;
