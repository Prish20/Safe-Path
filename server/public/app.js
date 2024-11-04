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
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
require("dotenv/config");
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _authroutes = /*#__PURE__*/ _interop_require_default(require("./routes/auth.routes"));
const _incidentroutes = /*#__PURE__*/ _interop_require_default(require("./routes/incident.routes"));
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
app.use((0, _cors.default)({
    origin: [
        'http://localhost:5173',
        'https://safe-path-frontend.vercel.app'
    ],
    credentials: true
}));
app.get('/', (_, res)=>{
    res.send('Root endpoint check ');
});
app.use("/api/auth", _authroutes.default);
app.use("/api/incident", _incidentroutes.default);
(0, _db.default)();
const _default = app;
