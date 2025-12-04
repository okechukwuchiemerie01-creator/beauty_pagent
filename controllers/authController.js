const authService = require("../service/authService");

/**
 * Controller for registering a new user
 */
exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: "✅ Registration successful",
            user
        });
    } catch (error) {
        res.status(400).json({ message: `❌ ${error.message}` });
    }
};

/**
 * Controller for logging in a user
 */
exports.login = async (req, res) => {
    try {
        const { user, token } = await authService.loginUser(req.body);
        res.json({
            message: "✅ Login successful",
            user,
            token
        });
    } catch (error) {
        res.status(400).json({ message: `❌ ${error.message}` });
    }
};
