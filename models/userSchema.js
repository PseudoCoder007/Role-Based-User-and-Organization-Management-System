const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Super Admin', 'Organization Admin', 'Organization Employee'],
        required: true
    },
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    token_ids: {
        type: Array,
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password= await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (password) {
//     console.log("matchPassword", password);
//     return await bcrypt.compare("123456789", this.password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;