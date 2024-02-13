const bcrypt = require("bcrypt");

const encriptPass = (data) => {
    return bcrypt.hash(data, 8);
};

module.exports = encriptPass;