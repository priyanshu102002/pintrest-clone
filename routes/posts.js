const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Array,
        default: [],
    },
    // user id will come
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
