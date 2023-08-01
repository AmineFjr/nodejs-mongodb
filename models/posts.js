const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String },
    likes: { type: Number, require: true, default: 0 },
    dislikes: { type: Number, require: true, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});


module.exports = mongoose.model('posts', postsSchema);