import 'dotenv/config';

import express, {Express} from 'express';

import DataBAseConnection from './config/db';

const PORT: number = process.env.PORT || 3002;
const app: Express = express();

const start = async (): Promise<void> => {
    try {
        await DataBAseConnection.connection(process.env.DB_HOST as string);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error: object) {
        console.error('Error occurred while starting the server:', error);
        process.exit(1);
    }
}

start();
