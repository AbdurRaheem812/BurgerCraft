import express from 'express';
import {signupController, loginController} from '../controllers/authController.js';
import { validateSignup } from '../validator/authValidator.js';
import {verifyToken} from '../middlewares/authentication.js';

const router = express.Router();

router.post('/signup', validateSignup, signupController);
router.post('/login', loginController);

export default router;