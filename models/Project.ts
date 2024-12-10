import {Schema, model} from 'mongoose';

import {IProject} from './task-and-user-definitions'

const ProjectSchema = new Schema<IProject>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Owner'
    },
    timeOfCreation: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

export default model<IProject>('Project', ProjectSchema);
