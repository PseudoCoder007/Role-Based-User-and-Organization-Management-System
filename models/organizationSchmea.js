const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;