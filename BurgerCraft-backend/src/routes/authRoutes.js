import express from 'express';
import {signupController, loginController} from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../validator/authValidator.js';
import {verifyToken} from '../middlewares/authentication.js';

const router = express.Router();

router.post('/signup', validateSignup, signupController);
router.post('/login', validateLogin, loginController);

export default router;