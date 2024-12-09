import {Document} from "mongoose";
import {UserRole} from "../models/User";

export interface UserDocument extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface RegistrationBody {
    firstName: string;
    lastName: string;
    age?: number;
    email: string;
    password: string;
    gender: string;
    role?: string;
}