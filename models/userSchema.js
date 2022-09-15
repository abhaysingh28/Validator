const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [3, 'Password must be at least 8 characters'],
        select: false
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [emailFormat, 'Email is invalid'],

    }
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}


module.exports = mongoose.model("User", userSchema);

