import { Router } from 'express';
import { check } from 'express-validator';
import AuthController from '../Controller/authController';

const router = Router();

const registrationValidation = [
    check('firstName', 'Name cannot be empty').notEmpty(),
    check('lastName', 'Last name cannot be empty').notEmpty(),
    check('email', 'Email cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').isLength({ min: 6, max: 12 }),
];

router.post('/registration', registrationValidation, AuthController.registration);

export default router;
