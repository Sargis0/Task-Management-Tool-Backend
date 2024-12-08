import 'dotenv/config';

import express, {Express} from 'express';

import {corsMiddleware} from './middleware/cors';

import DataBAseConnection from './config/db';

const PORT: number = parseInt(process.env.PORT || '3002', 10);
const app: Express = express();

app.use(corsMiddleware);

const start = async (): Promise<void> => {
    try {
        await DataBAseConnection.connection(process.env.DB_HOST as string);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('Error occurred while starting the server:', error);
        process.exit(1);
    }
}

start();
