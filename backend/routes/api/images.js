const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');

const router = express.Router();


//ADD IMAGES TO POST

//ADD USER IMAGE

//EDIT POST IMAGES

//EDIT USER IMAGE

//DELETE POST IMAGE

//DELETE USER IMAGE
