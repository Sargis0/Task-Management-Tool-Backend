import {Document, Types} from 'mongoose';

export enum UserRole {
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    User = 'USER',
}

export enum TaskPriority {
    Low = 'LOW',
    Medium = 'MEDIUM',
    High = 'HIGH',
}

export enum TaskStatus {
    Todo = 'Todo',
    InProgress = 'In Progress',
    Complete = 'Complete',
}

interface IUserBase extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface IOwner extends IUserBase {
    company: string,
    registrationTime: Date,
    projects: Types.ObjectId[]
}

export interface IProject extends Document {
    name: string;
    description: string;
    creator: Types.ObjectId;
    timeOfCreation: Date;
    deadline: Date;
    admin: Types.ObjectId;
    manager?: Types.ObjectId;
    participants: Types.ObjectId[];
    tasks: Types.ObjectId[];
}

export interface ITask extends Document {
    title: string;
    description?: string;
    creator: Types.ObjectId;
    timeOfCreation: Date;
    status: TaskStatus;
    priority: TaskPriority;
    estimatedCompletionTime?: number;
    assignedTo?: Types.ObjectId;
    project: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser extends IUserBase {
    role: UserRole;
    owner?: Types.ObjectId;
    projects: Types.ObjectId[];
    tasks: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
