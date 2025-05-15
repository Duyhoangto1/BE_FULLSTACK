const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createUserService = async (name, email, password) => {
    try {
        const hashword = await bcrypt.hash(password, saltRounds);

        let result = await User.create({
            name: name,
            email: email,
            password: hashword,
            role: 'user'
        });
        return result;

    } catch (error) {
        console.error("Error in createUserService:", error);
        return null;
    }
};

const Login = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const payload = {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN }
                );
                return {
                    access_token,
                    EC: 0,
                    EM: "Login success",
                    data: user
                };
            } else {
                return {
                    EC: 1,
                    EM: "Password does not match"
                };
            }
        } else {
            return {
                EC: 1,
                EM: "Email/password not found"
            };
        }
    } catch (error) {
        console.error("Error in Login:", error);
        return {
            EC: 2,
            EM: "An error occurred during login"
        };
    }
};
const getListAllUser = async () => {
    try {
        // Fetch all users from the database, excluding the password field for security
        const users = await User.find({}, { password: 0 });
        return {
            EC: 0,
            EM: "Success",
            data: users
        };
    } catch (error) {
        console.error("Error in getListAllUser:", error);
        return {
            EC: 1,
            EM: "Failed to fetch users",
            data: null
        };
    }
};

module.exports = {
    createUserService,
    Login,
    getListAllUser,
  
};