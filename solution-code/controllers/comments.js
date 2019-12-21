const Post = require('../models/post.js');

//
// show
//

exports = function (req, res, next) {
    if (!req.user) return next(new Error('You must be logged to create a comment'));
  
    const id = req.params.id;
  
    Post.update({ _id: id }, { $push: { comments: {
      content: req.body.content,
      authorId: req.user.id,
      imagePath: req.file.url,
      imageName: req.file.originalname
    }}})
      .then(book => {
        res.redirect(`/posts/${id}`);
      })
      .catch(next)
    ;
}