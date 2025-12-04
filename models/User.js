const mongoose = require("mongoose");

// User schema defines structure of user documents in MongoDB
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true }, // First name
    lastname:  { type: String, required: true }, // Last name
    email:     { type: String, required: true, unique: true }, // Email (unique)
    password:  { type: String, required: true }, // Hashed password
    role:      { type: String, default: "user" }, // Optional: "user" or "admin"
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

module.exports = mongoose.model("User", userSchema);
