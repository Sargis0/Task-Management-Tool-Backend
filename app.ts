import 'dotenv/config';

import express, {Express} from 'express';

const PORT = process.env.PORT || 3002;

const app:Express = express();

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
});
