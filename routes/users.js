const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost:27017/pintrest-clone");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    // post id will come here and stored it in array
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    dp: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
});

userSchema.plugin(plm);

const User = mongoose.model("User", userSchema);

module.exports = User;
