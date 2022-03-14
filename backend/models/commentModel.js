const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: 'string',
        required: true,
    }
})
module.exports = mongoose.model('comment', commentSchema)