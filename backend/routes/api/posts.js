const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Post } = require('../../db/models');

const router = express.Router();

//GET ALL POSTS
router.get(
    '/',
    async (req, res, next) => {
        const allPosts = await Post.findAll();

        const posts = allPosts.map(post => {
            return {
                id: post.id,
                userId: post.userId,
                title: post.title,
                description: post.description,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            };
        });
        res.json({ Posts: posts });
    }
);

//GET ALL USER POSTS
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const allUserPosts = await Post.findAll({
            where: { userId: userId },
        });

        const posts = allUserPosts.map(post => {
            return {
                id: post.id,
                userId: post.userId,
                title: post.title,
                description: post.description,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        });
        res.json({ Posts: posts });
    }
);

//GET POST DETAILS FROM ID
router.get(
    '/:postId',
    async (req, res, next) => {
        const postId = req.params.postId;
        const post = await Post.findOne({
            where: { id: postId }
        });

        if (post) {
            return res.json({ Post: post });
        }
        return res.status(404).json({ "message": "Post couldn't be found" });
    }
);

//CREATE NEW POST
router.post(
    '/new',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const { title, description } = req.body;

        const post = await Post.create({ userId, title, description });

        const safePost = {
            id: post.id,
            userId: userId,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        };

        await setTokenCookie(res, req.user);
        return res.status(201).json(
            safePost
        );
    }
);

//UPDATE A POST
router.put(
    '/:postId',
    requireAuth,
    async (req, res, next) => {
        await setTokenCookie(res, req.user);
        const userId = req.user.id;
        const postId = req.params.postId;
        const { title, description } = req.body;
        const post = await Post.findByPk(postId);

        if (post) {
            if (post.userId !== userId) {
                res.status(403).json({ "message": "Forbidden" });
            }

            if (post.userId === userId) {
                const safePost = {
                    id: post.id,
                    userId: userId,
                    title: title,
                    description: description,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt
                };
                await post.update(safePost);
                return res.status(201).json(safePost);
            }
        }
        res.status(404).json({ "message": "Post not found" });
    }
);

//DELETE A POST
router.delete(
    '/:postId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const postId = req.params.postId;

        const post = await Post.findByPk(postId);

        if (post) {
            if (post.userId !== userId) {
                res.status(403).json({ "message": "Forbidden" });
            }

            await setTokenCookie(res, req.user);
            await post.destroy();
            return res.status(200).json({ "message": "Successfully deleted" });
        }
        return res.status(404).json({ "message": "Post couldn't be found" });
    }
);


module.exports = router;
