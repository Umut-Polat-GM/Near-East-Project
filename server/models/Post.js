const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            // required: [true, "Please provide a title"],
            minlength: 3,
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
        image: {
            type: String,
            validate: {
                validator: function (v) {
                    // 'image' değeri varsa, regex ile doğrulama yap.
                    return !v || /\.(jpg|jpeg|png|gif)$/.test(v);
                },
                message: "Please provide a valid image with jpg, jpeg, png or gif",
            },
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
