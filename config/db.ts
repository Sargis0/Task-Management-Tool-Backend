import mongoose from 'mongoose';

class DataBAseConnection {
    async connection(dbURI: string): Promise<void> {
        try {
            await mongoose.connect(dbURI);
            console.log('Connection to the database successfully');
        } catch (error) {
            console.log('Connection to the database failed: ', error);
            process.exit(1);
        }
    }
}

export default new DataBAseConnection();
