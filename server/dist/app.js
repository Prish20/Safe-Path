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
const _db = /*#__PURE__*/ _interop_require_default(require("./config/db"));
require("dotenv/config");
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _authroutes = /*#__PURE__*/ _interop_require_default(require("./routes/auth.routes"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
app.use(_express.default.json({
    limit: '10mb'
}));
app.use((0, _cookieparser.default)());
app.get('/', (_, res)=>{
    res.send('Root endpoint check ');
});
app.use("/api/auth", _authroutes.default);
(0, _db.default)();
const _default = app;
