const Post = require('../models/post.js');

//
// new
//

exports.new = function (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
        return;
    }

    res.render('posts/new');
}

//
// create
//

exports.create = function (req, res, next) {
    if (!req.user) {
        return next(new Error('You must be logged to create a post'));
    }

    Post.create({
        content: req.body.content,
        creatorId: req.user.id,
        picPath: req.file.url,
        picName: req.file.originalname
    })
        .then(post => res.redirect('/'))
        .catch(next);
};

//
// show
//

exports.show = function (req, res, next) {
    const id = req.params.id;

    Post.findById(id)
        .populate('comments.authorId')
        .then(post => {
        console.log('post', post.comments);

        res.render('posts/show', {
            post: post,
            user: req.user
        });
        })
        .catch(next);
}