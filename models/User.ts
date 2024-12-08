import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

enum UserRole {
    Admin = 'Admin',
    Manager = 'Manager',
    User = 'User',
}

interface User extends Document {
    name: string;
    lastName: string;
    email: string;
    age?: number;
    password: string;
    role: UserRole;
}

const UserSchema: Schema<User> = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        min: 0,
        required: false,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<User>('User', UserSchema);
