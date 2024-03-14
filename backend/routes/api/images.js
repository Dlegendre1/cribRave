const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');

const router = express.Router();


//ADD IMAGES TO POST
router.post(
    '/:postId/new',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const postId = req.params.postId;
        const { commentText } = req.body;

        const image = await Image.create({ userId, postId, commentText });

        const safeImage = {
            id: image.id,
            userId: image.userId,
            postId: image.postId,
            commentText: image.commentText
        };

        await setTokenCookie(res, req.user);
        return res.status(201).json(
            safeImage
        );
    }

);

//ADD USER IMAGE
router.post(
    '/new',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const { url } = req.body;

        const image = await Image.create({ userId, url });

        const safeImage = {
            id: image.id,
            userId: image.userId,
            url: image.url
        };

        await setTokenCookie(res, req.user);
        return res.status(201).json(
            safeImage
        );
    }

);

//EDIT POST IMAGES

//EDIT USER IMAGE

//DELETE POST IMAGE
router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const imageId = req.params.imageId;

        const image = await Image.findByPk(imageId);

        if (image) {
            if (post.userId !== userId) {
                res.status(403).json({ "message": "Forbidden" });
            }

            await setTokenCookie(res, req.user);
            await image.destroy();
            return res.status(200).json({ "message": "Successfully deleted" });
        }
        return res.status(404).json({ "message": "Image couldn't be found" });
    }
);

module.exports = router;
