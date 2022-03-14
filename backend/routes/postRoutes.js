const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');
const postController = require('../controllers/postControllers');

router.post('/addPost', authController.verifyUser, postController.addPost);
router.post('/fetchPosts', authController.verifyUser, postController.fetchPosts);
router.post('/readMore', postController.readMore);
router.post('/upVote', postController.upVote);
// router.post('/downVote', postController.downVote);
router.post('/addComment', authController.verifyUser, postController.addComment);
router.post('/fetchComments', authController.verifyUser, postController.fetchComments);
router.post('/searchPosts', postController.searchPosts);
module.exports = router;
