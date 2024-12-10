import {Schema, model} from 'mongoose';

import {IOwner} from './task-and-user-definitions'

const OwnerSchema: Schema<IOwner> = new Schema<IOwner>({
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
    company: {
        type: String,
        required: true,
        unique: true,
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
    registrationTime: {
        type: Date,
        default: Date.now
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }]
});

export default model<IOwner>('ownerSchema', OwnerSchema);
