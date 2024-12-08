import mongoose, { Document, Schema, Types } from 'mongoose';

enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

enum TaskStatus {
    Todo = 'Todo',
    InProgress = 'In Progress',
    Complete = 'Complete'
}

interface Task extends Document {
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate?: Date;
    assignedTo?: Types.ObjectId;
    createdBy: Types.ObjectId;
}

const TaskSchema: Schema<Task> = new Schema<Task>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    priority: {
        type: String,
        enum: Object.values(TaskPriority),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.Todo,
    },
    dueDate: {
        type: Date,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<Task>('Task', TaskSchema);
