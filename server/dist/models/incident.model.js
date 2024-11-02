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
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const incidentSchema = new _mongoose.default.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            'accident',
            'theft',
            'other'
        ]
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    location: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: false
        }
    ],
    reportedBy: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    status: {
        type: String,
        enum: [
            'pending',
            'investigating',
            'resolved'
        ],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Incident = _mongoose.default.model('Incident', incidentSchema);
const _default = Incident;
