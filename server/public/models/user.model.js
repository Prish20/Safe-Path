"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "User", {
    enumerable: true,
    get: function() {
        return User;
    }
});
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const userSchema = new _mongoose.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    photoURL: {
        type: String
    },
    password: {
        type: String
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiresAt: {
        type: Date
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiresAt: {
        type: Date
    }
}, {
    timestamps: true
});
const User = _mongoose.default.model("User", userSchema);
