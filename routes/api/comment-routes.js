const router = require('express').Router();
const {addComment, removeComment} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router
    .route('/:pizzaId')
    .post(addComment); // can also put route and post in one line

// /api/comments/<pizzaId>/<commentId>
router
    .route('/:pizzaId/:commentId')
    .delete(removeComment);


module.exports = router;