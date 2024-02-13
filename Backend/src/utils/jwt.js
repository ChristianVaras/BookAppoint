const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return decoded;
    } catch (error) {
        throw error;
    }
};

const createToken = (data) =>
    jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_SECRET_EXP,
    });

module.exports = { verifyToken, createToken };