import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import leadRoutes from './routes/lead.routes.js';
import { notFound, errorHandler } from './middlewares/error.js';

dotenv.config();

const app = express();

// security + parsing
app.use(helmet());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

// CORS
const allowOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: allowOrigins.length ? allowOrigins : '*' }));

// logs (skip noisy in test)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// basic rate limit
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// routes
app.get('/health', (req, res) => res.json({ success: true, message: 'OK' }));
app.use('/api', leadRoutes);

// errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};

start();
