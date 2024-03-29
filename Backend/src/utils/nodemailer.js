const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
    },
});
module.exports = { transporter };