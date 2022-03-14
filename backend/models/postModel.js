const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: 'string',
        required: true,
    },
    link: {
        type: 'string',
        required: true,
    },
    desc: {
        type: 'string',
        required: true,
    },
    category: {
        type: 'string',
        required: true,
    },
    upVotes: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    upVotesNum: {
        type: Number,
    },
    upVoteStatus: {
        type: 'boolean',
    },
    downVoteStatus: {
        type: 'boolean',
    },
    savedStatus: {
        type: 'boolean',
    },
    upVotecheck: {
        type: 'string',
    },
    downVotes: [
        {
            type: Schema.Types.ObjectId
        }
    ],

}, { timestamps: true });
postSchema.pre("save", function (next) {
    let num = this.upVotes.length;
    this.upVotesNum = num;
    console.log('this is upVotes number' + this.upVotesNum)
    next();
});
postSchema.methods.userStatus = function (id) {
    let check = this.upVotes.includes(id);
    if (check) {
        return this.upVotecheck = 'liked'
    }
    else {
        return this.upVotecheck = 'not liked'
    }
}
// postSchema.virtual("upVotesNum").get(function () {
//     let num = this.upVotes.length;
//     return num;
// })

// postSchema.methods.hello = function () {
//     console.log('run.....');
//     // return 1;
// }
// postSchema.methods.fun = function () {
//     console.log('run........');
// }
module.exports = mongoose.model('post', postSchema);