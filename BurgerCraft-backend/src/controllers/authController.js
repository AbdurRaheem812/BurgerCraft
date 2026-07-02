import {signupServices, loginServices} from '../services/authServices.js';

export const signupController = async (req, res) => {
    try {
        const { username, email, phoneNumber, password } = req.body;
        const user = await signupServices(username, email, phoneNumber, password);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginServices(email, password);
        res.status(200).json({ message: 'Login successful', token: result.token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};