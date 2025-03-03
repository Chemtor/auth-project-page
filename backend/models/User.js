const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password : {
        type: String,
        required: true,
        minlength: [4, 'Password must be at least 4 characters']
    },
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);