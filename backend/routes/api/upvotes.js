const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Upvote } = require('../../db/models');

const router = express.Router();

//ADD UPVOTE/DOWNVOTE TO COMMENT
// router.post(
//     '/:commentId',
//     requireAuth,
//     async (req, res, next) => {
//         const userId = req.user.id;
//         const commentId = req.params.commentId;
//         const { isUpvote } = req.body;

//         const upvote = await Upvote.create({ userId, commentId, isUpvote });

//         const safeUpvote = {
//             id: upvote.id,
//             userId: userId,
//             commentId: commentId,
//             isUpvote: upvote.isUpvote,
//         };

//         await setTokenCookie(res, req.user);
//         return res.status(201).json(

//             safeUpvote
//         );
//     }
// );

//ADD UPVOTE/DOWNVOTE TO POST

//REMOVE UPVOTE/DOWNVOTE TO COMMENT

//REMOVE UPVOTE/DOWNVOTE TO POST

module.exports = router;
