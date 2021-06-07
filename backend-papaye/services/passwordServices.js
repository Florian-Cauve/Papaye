const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const hash = (password) => {
    return bcrypt.hashSync(password, 10);
}

const authenticate = async (loginData) => {
    const username = loginData.username;
    const password = loginData.password
    var userLogged = {};
    await User.findOne({ username })
        .then((user) => {
            if(bcrypt.compareSync(password, user.password)){
                userLogged = user;
            }
        })
        .catch(err => console.log(err))

    return userLogged;
}

module.exports = {
    authenticate,
    hash
};