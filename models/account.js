// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Challenge = require('../models/challenge');


var accountSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
        first_name: String,
        last_name: String
    },
    challenges: [Challenge.schema],
});

// methods ======================
// generating a hash
accountSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
accountSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Account', accountSchema);
