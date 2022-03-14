const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        required: true,
        type: 'string',
    },
    email: {
        required: true,
        type: 'string'
    },
    password: {
        required: true,
        type: 'string'
    },
    interests: {
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]
}, { timeStamps: true });

module.exports = mongoose.model('User', userSchema);