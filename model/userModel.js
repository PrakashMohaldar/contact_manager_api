const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email:{
        type: String,
        required: [true, "please add the contact email"],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']    },
    password:{
        type: String,
        required: [true, "Please add the password"],
        minlength: [6, 'Password should be at least 6 characters long']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema)