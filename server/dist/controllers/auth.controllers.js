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
    signin: function() {
        return signin;
    },
    signout: function() {
        return signout;
    },
    signup: function() {
        return signup;
    }
});
const _usermodel = require("../models/user.model.js");
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _generateVerificationToken = require("../utils/generateVerificationToken.js");
const _generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie.js");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const signup = async (req, res)=>{
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({
                error: "All fields are required"
            });
        }
        const userExist = await _usermodel.User.findOne({
            email
        });
        if (userExist) {
            res.status(400).json({
                error: "User already exists"
            });
        }
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        const verificationToken = (0, _generateVerificationToken.generateVerificationToken)();
        const user = new _usermodel.User({
            firstName,
            lastName,
            email,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
            password: hashedPassword
        });
        await user.save();
        (0, _generateTokenAndSetCookie.generateTokenAndSetCookie)(res, user._id);
        res.status(201).json({
            message: "User created successfully",
            user: _object_spread_props(_object_spread({}, user.toObject()), {
                password: undefined
            })
        });
    } catch (error) {
        res.status(400).json({
            error: "Something went wrong"
        });
    }
};
const signin = async (req, res)=>{
    res.send("Signin route");
};
const signout = async (req, res)=>{
    res.send("Signout route");
};
