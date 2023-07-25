const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isTeacher: {
        type: Boolean,
        default: false
    },
    last_activity_at: {
        type: Date,
    },
    token: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('User', userSchema);
