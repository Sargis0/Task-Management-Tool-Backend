import cors from 'cors';

interface ICorsOptions {
    origin: string,
    methods: string,
    allowedHeaders: string
}

const corsOptions: ICorsOptions = {
    origin: process.env.CORS_ALLOWED_CLIENT_DOMAIN as string,
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
};

export const corsMiddleware = cors(corsOptions);
