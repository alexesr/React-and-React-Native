const express = require('express');

const PostController = require('../controllers/posts');

const router = express.Router();

router.post('',PostController.savePost);
router.get('',PostController.getPosts);
router.delete('/:id',PostController.removePost);
router.put('/:id',PostController.updatePost);

module.exports = router;