const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
                return {
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

module.exports = {
    createUserService,
    Login
};