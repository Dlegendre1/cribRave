const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');

const router = express.Router();

//ADD UPVOTE/DOWNVOTE TO COMMENT

//ADD UPVOTE/DOWNVOTE TO POST

//REMOVE UPVOTE/DOWNVOTE TO COMMENT

//REMOVE UPVOTE/DOWNVOTE TO POST
