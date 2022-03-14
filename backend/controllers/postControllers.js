const Post = require('../models/postModel');
const User = require('../models/userModel');
const { post } = require('../routes/postRoutes');
const Comment = require('../models/commentModel');
const { find } = require('../models/postModel');

exports.addPost = async (req, res, next) => {
    const title = req.body.title;
    const link = req.body.link;
    const desc = req.body.desc;
    const category = req.body.category;
    const upVotes = req.body.upVotes;
    const downVotes = req.body.downVotes;
    const post = new Post({
        user: req.userId,
        title: title,
        link: link,
        desc: desc,
        category: category,
        upVotes: upVotes,
        downVotes: downVotes,
    });
    const savePost = await post.save();
    const user = await User.findOne({ _id: req.userId });
    user.posts.push(savePost);
    const saveUser = await user.save();
    console.log(saveUser);
    res.status(201).json({ 'user': saveUser, 'post': savePost });
}

exports.fetchPosts = async (req, res, next) => {
    console.log('cookie ' + req.cookies.userToken);
    const getUser = await User.findOne({ _id: req.userId });
    const pageLimit = 4;
    const currentPageNo = req.body.pageNo || 1;
    const sort = req.body.sortBy;
    console.log(sort);
    // if (sort === 'new') {
    //     sort = 'createdAt'
    // }
    // else {
    //     sort == 'upVotesNum'
    // }
    // const
    // console.log(getUser.interests);
    // const
    const posts = (sort === 'new') ? await Post.find({ category: { $in: getUser.interests } })
        .sort({ createdAt: 'desc' })
        .skip((currentPageNo - 1) * pageLimit)
        .limit(4) : await Post.find({ category: { $in: getUser.interests } })
            .sort({ upVotesNum: 'desc' })
            .skip((currentPageNo - 1) * pageLimit)
            .limit(4);
    // const final = await posts.find();
    let status = posts.map((post) => {
        post.userStatus(req.userId)
        // return post.upVotecheck;
    })
    // posts.forEach(post => {
    //     console.log(post.status);
    // })
    res.status(200).json({ 'posts': posts, 'status': status });
}

// exports.getNewPosts = (req, res, next) => {

// }

exports.readMore = async (req, res, next) => {
    const postId = req.body.postId;
    console.log('postId' + postId);
    const postDetails = await Post.findOne({ _id: postId });
    console.log(postDetails);
    res.status(200).json({ 'post': postDetails });
};

exports.upVote = async (req, res, next) => {
    const post = req.body.postId;
    const user = req.body.userId;
    const post2 = await Post.findOne({ _id: post });
    const findDownVote = post2.downVotes.includes(user);
    const checkUpVote = post2.upVotes.includes(user);
    if (!findDownVote && checkUpVote) {
        const index = post2.upVotes.indexOf(user);
        console.log(index);
        post2.upVotes.splice(index, 1);
        post2.upVoteStatus = false;
        await post2.save()
        console.log(post2);
        // post2.upVotes.push(user)
    }
    else if (!findDownVote) {
        post2.upVoteStatus = true;
        post2.upVotes.push(user)
        const savedPost = await post2.save()
        console.log(savedPost);
    }
    else if (findDownVote) {
        const index = post2.downVotes.indexOf(user);
        post2.downVotes.splice(index, 1);
        post2.upVotes.push(user)
        console.log(post2);
    }

    else if (!checkUpVote) {
        post2.upVotes.push(user)
        console.log(post2);
    }
    console.log(checkUpVote);
    res.status(200).json({ 'post': post2.upVotes, 'message': 'done', 'num': post2.upVotesNum });
}
// exports.downVote = async (req, res, next) => {
//     const post = req.body.postId;
//     const user = req.body.userId;
//     const post2 = await Post.findOne({ _id: post });
//     const findDownVote = post2.downVotes.includes(user);
//     const checkUpVote = post2.upVotes.includes(user);

//     if (!checkUpVote && findDownVote) {
//         const index = post2.upVotes.indexOf(user);
//         console.log(index);
//         post2.upVotes.splice(index, 1);
//         post2.upVoteStatus = false;
//         await post2.save()
//         console.log(post2);
//         // post2.upVotes.push(user)
//     }
//     else if (!checkUpVote) {
//         // post2.upVoteStatus = true;
//         post2.downVotes.push(user)
//         const savedPost = await post2.save()
//         console.log(savedPost);
//     }
//     else if (checkUpVote) {
//         const index = post2.upVotes.indexOf(user);
//         post2.upVotes.splice(index, 1);
//         post2.downVotes.push(user)
//         console.log(post2);
//     }
//     else if (!findDownVote) {
//         post2.downVotes.push(user)
//         console.log(post2);
//     }
//     console.log(checkUpVote);
//     res.status(200).json({ 'post': post2.upVotes, 'status': post2.upVoteStatus });
// }
exports.addComment = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.body.postId;
    const userComment = req.body.comment;
    console.log(postId);

    const comment = new Comment({
        userId: userId,
        postId: postId,
        comment: userComment
    })
    const savedComment = await comment.save();
    const findUser = await User.findOne({ _id: userId });
    findUser.comments.push(savedComment);
    const user = await findUser.save();

    res.status(200).json({ 'message': 'done', 'comment': user })
}

exports.fetchComments = async (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.userId;
    const comments = await Comment.find({ postId: postId }).populate('userId');

    res.status(200).json({ 'comments': comments })
}

// search 
exports.searchPosts = async (req, res, next) => {
    const value = req.body.term;
    let regex = new RegExp(value, 'i');

    const posts = await Post.find({ title: regex });
    // posts.map((post) => {
    //     console.log(post.upVotesNum);
    let status = posts.map((post) => {
        return post.userStatus(req.userId);
    })
    // })
    res.status(200).json({ 'posts': posts, 'status': status })
}