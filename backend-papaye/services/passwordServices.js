const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const hash = (password) => {
    return bcrypt.hashSync(password, 10);
}

const authenticate = async (loginData) => {
    const username = loginData.username;
    const password = loginData.password
    var login = false
    await User.findOne({ username })
        .then((user) => {login = bcrypt.compareSync(password, user.password)})
        .catch(err => console.log(err))

    return login;
}

module.exports = {
    authenticate,
    hash
};