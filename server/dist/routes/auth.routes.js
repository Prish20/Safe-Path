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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.post("/signup", _authcontrollers.signup);
router.post("/signin", _authcontrollers.signin);
router.post("/signout", _authcontrollers.signout);
const _default = router;
