const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            // required: [true, "Please provide a title"],
            minlegth: 3,
            maxlength: 100,
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
            minlegth: 10,
            maxlength: 1000,
        },
        url: {
            type: String,
            // required: [true, "Please provide a URL"],
            match: [
                /^(ftp|http|https):\/\/[^ "]+$/,
                "Please provide a valid URL with http, https or ftp",
            ],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
