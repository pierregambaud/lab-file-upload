const express = require('express');
const router = express.Router();

const uploadCloud = require('../config/cloudinary.js')

const postsController = require('../controllers/posts.js');
const commentsController = require('../controllers/comments.js');

router.get('/new', postsController.new);

router.post('/', uploadCloud.single('pic'), postsController.create);

router.get('/:id', postsController.show);

router.post('/:id/comments', uploadCloud.single('image'), commentsController.show);

module.exports = router;