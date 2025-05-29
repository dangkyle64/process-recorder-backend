import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import processRoutes from './router/processRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', processRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is currently running on port http://localhost:${PORT}/`);
});

