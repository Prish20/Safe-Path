"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateVerificationToken", {
    enumerable: true,
    get: function() {
        return generateVerificationToken;
    }
});
const generateVerificationToken = ()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
};
