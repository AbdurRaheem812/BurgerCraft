import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.js';

export const validateSignup = [
    body('username', 'Username is required').trim().isString().notEmpty().escape(),
    body('email').trim().isEmail().withMessage('Email is not valid'),
    body('phoneNumber').trim().isMobilePhone('any').withMessage('Phone number is not valid'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
        .withMessage("Password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character"),
    handleValidationErrors 
];

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address'),
        
    body('password')
        .notEmpty().withMessage('Password is required'),
        
    handleValidationErrors
];

export const validateCreateOrder = [
    body('items')
        .isArray({ min: 1 }).withMessage('Order must contain at least one item'),
        
    body('items.*.productId')
        .trim()
        .notEmpty().withMessage('Product ID is required for each item'),

    body('items.*.quantity')
        .isInt({ min: 1 }).withMessage('Quantity must be an integer of 1 or greater'),

    body('totalPrice')
        .isFloat({ min: 0.01 }).withMessage('Total price must be a positive number greater than 0'),
        
    body('ingredients')
        .isArray({ min: 1 }).withMessage('Ingredients list cannot be empty'),
        
    body('ingredients.*')
        .trim()
        .isString().withMessage('Ingredients must be text strings')
        .notEmpty().withMessage('Ingredient item name cannot be empty'),

    handleValidationErrors
];

export const validateSaveCard = [        
    body('cardNumber')
        .trim()
        .notEmpty().withMessage('Card number is required'),
        
    body('expiryDate')
        .trim()
        .notEmpty().withMessage('Expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).withMessage('Expiry date must match MM/YY format'),
        
    body('cvv')
        .trim()
        .notEmpty().withMessage('CVV is required')
        .isLength({ min: 3, max: 4 }).withMessage('CVV must be 3 or 4 digits')
        .isNumeric().withMessage('CVV must contain numbers only'),

    handleValidationErrors
];