import {Schema, model} from 'mongoose';

import {UserRole, IUser} from './task-and-user-definitions';

const UserSchema: Schema<IUser> = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.User
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true,
    versionKey: false,
});

export default model<IUser>('User ', UserSchema);