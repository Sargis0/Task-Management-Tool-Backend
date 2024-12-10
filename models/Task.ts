import {Schema, model} from 'mongoose';

import {TaskPriority, TaskStatus, ITask} from './task-and-user-definitions';

const TaskSchema: Schema<ITask> = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    timeOfCreation: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(TaskStatus),
        default: TaskStatus.Todo
    },
    priority: {
        type: String,
        required: true,
        enum: Object.values(TaskPriority)
    },
    estimatedCompletionTime: {
        type: Number
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    }
}, {
    timestamps: true,
});

export default model<ITask>('Task', TaskSchema);
