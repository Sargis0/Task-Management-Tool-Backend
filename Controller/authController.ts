import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Request, Response, RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import User, { UserRole } from '../models/User';

import {UserDocument, RegistrationBody} from './types';

class AuthController {
    static registration: RequestHandler = async (request: Request<{}, {}, RegistrationBody>, response: Response): Promise<void> => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            response.status(400).send({ message: 'Registration errors', errors: errors.array() });
            return;
        }

        try {
            const { firstName, lastName, age, email, password, gender, role } = request.body;
            const existingUser = await User.findOne({ email }) as UserDocument | null;

            if (existingUser) {
                response.status(400).json({ message: 'This email is already in use' });
                return;
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                firstName,
                lastName,
                age,
                email,
                password: hashPassword,
                gender,
                role: role || UserRole.Admin,
            });

            await newUser.save();
            response.status(201).json({ message: 'The user has been successfully registered.' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(500).json({ message: 'An error occurred during registration', error: error.message });
            } else {
                response.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    };

    static login: RequestHandler = async (request: Request<{}, {}, { email: string; password: string }>, response: Response): Promise<void> => {
        try {
            const { email, password } = request.body;
            const existingUser = await User.findOne({ email }) as UserDocument | null;

            if (!existingUser) {
                response.status(400).json({ message: `User with email ${email} not found` });
                return;
            }

            const validPassword = bcrypt.compareSync(password, existingUser.password);

            if (!validPassword) {
                response.status(400).json({ message: 'Incorrect password' });
                return;
            }

            const token = this.generateToken(existingUser._id, existingUser.role);
            response.json({ token });
        } catch (error: any) {
            console.error('Login error:', error);
            response.status(500).json({ message: 'Login failed', error: error.message });
        }
    };

    private static generateToken(id: string, role: UserRole): string {
        const payload = { id, role };
        const secretKey = process.env.SECRET_JWT_TOKEN;

        if (!secretKey) {
            throw new Error('JWT secret is not defined');
        }

        return jwt.sign(payload, secretKey, { expiresIn: '24h' });
    }
}

export default AuthController;
