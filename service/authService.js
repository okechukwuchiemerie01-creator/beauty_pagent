const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required");
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already exists");

    // Hash password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document in MongoDB
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    return user;
};

exports.loginUser = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password required");

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { user, token };
};