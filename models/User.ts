import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    User = 'USER',
}

enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
    password: string;
    gender?: Gender;
    role: UserRole;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<User> = new Schema<User>({
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: false,
        min: 0,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: Object.values(Gender),
    },
    role: {
        type: String as StringConstructor,
        required: false,
        enum: Object.values(UserRole) as UserRole[],
        default: UserRole.Admin
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default model<User>('User ', UserSchema);