import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

import { AbortController } from 'abort-controller';

dotenv.config();

const controller = new AbortController();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }))

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello" });
})

app.listen(8080, () => console.log('Server has started on port 8080'))