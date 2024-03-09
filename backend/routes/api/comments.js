const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models');

const router = express.Router();



//GET ALL CURRENT USER COMMENTS

//GET ALL COMMENTS FOR A POST

//CREATE NEW COMMENT

//EDIT EXISTING COMMENT

//DELETE COMMENT
