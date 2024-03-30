const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Comment, User } = require('../../db/models');

const router = express.Router();

const validateComment = [
    check('commentText')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Comment cannot be empty')
];

//GET ALL CURRENT USER COMMENTS
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;

        const allUserComments = await Comment.findAll({
            where: { userId: userId }
        });

        const comments = allUserComments.map(comment => {
            return {
                id: comment.id,
                userId: userId,
                postId: comment.postId,
                commentText: comment.commentText,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt
            };
        });
        res.json({ Comments: comments });
    }
);

//GET ALL COMMENTS FOR A POST
router.get(
    '/:postId',
    async (req, res, next) => {
        const postId = req.params.postId;

        const allPostComments = await Comment.findAll({
            where: { postId: postId }
        });


        const comments = await Promise.all(allPostComments.map(async (comment) => {
            const user = await User.findOne({
                where: { id: comment.userId }
            });
            return {
                id: comment.id,
                userId: comment.userId,
                username: user.username,
                postId: comment.postId,
                commentText: comment.commentText,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt
            };
        }));
        res.json({ Comments: comments });
    }
);

//CREATE NEW COMMENT
router.post(
    '/:postId',
    validateComment,
    async (req, res, next) => {
        const userId = req.user.id;
        const postId = parseInt(req.params.postId);
        const { commentText } = req.body;

        if (commentText.trim().length < 1) {
            return res.status(400).json({ "commentText": "Comment must be at least 1 character" });
        }
        const user = await User.findByPk(parseInt(userId));
        const comment = await Comment.create({ userId, postId, commentText });


        const safeComment = {
            id: comment.id,
            userId: userId,
            postId: postId,
            username: user.username,
            commentText: comment.commentText.trim(),
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt
        };

        await setTokenCookie(res, req.user);
        return res.status(201).json(safeComment);
    }
);
//EDIT EXISTING COMMENT
router.put(
    '/:commentId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const commentId = req.params.commentId;
        const { commentText } = req.body;

        const user = await User.findByPk(parseInt(userId));
        const comment = await Comment.findOne({
            where: { id: commentId }
        });

        if (comment) {
            if (comment.userId !== userId) {
                res.status(403).json({ "message": "Forbidden" });
            }

            if (commentText.trim().length < 1) {
                return res.status(400).json({ "commentText": "Comment must be at least 1 character long" });
            }

            const safeComment = {
                id: commentId,
                userId: userId,
                postId: comment.postId,
                username: user.username,
                commentText: commentText.trim(),
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt
            };
            await comment.update(safeComment);
            return res.status(201).json(safeComment);
        }
        res.status(404).json({ "message": "Comment not found" });
    }
);

//DELETE COMMENT
router.delete(
    '/:commentId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const commentId = req.params.commentId;

        const comment = await Comment.findByPk(commentId);

        if (comment) {
            if (comment.userId !== userId) {
                res.status(403).json({ "message": "Forbidden" });
            }

            await setTokenCookie(res, req.user);
            await comment.destroy();
            return res.status(200).json({ "message": "Successfully deleted" });
        }
        return res.status(404).json({ "message": "Comment couldn't be found" });
    }
);


module.exports = router;
