const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all fields" });
    }

    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ user });
};

module.exports = register;
