import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.js';

export const validateSignup = [
    body('username', 'Username is required').trim().isString().notEmpty().escape(),
    body('email').trim().isEmail().withMessage('Email is not valid'),
    body('phoneNumber').trim().isMobilePhone().withMessage('Phone number is not valid'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
        .withMessage("Password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character"),
    handleValidationErrors // Checks errors automatically!
];