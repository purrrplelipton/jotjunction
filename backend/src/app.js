import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { noteRouter, userRouter } from './controllers/routers.js';
import { URI } from './utils/config.js';
import { error, info } from './utils/logger.js';
import { errorHandler, tokenExtractor, unknownEndpoint } from './utils/middleware.js';
const app = express();

const routes = [
	{ path: '/api/users', router: userRouter },
	{ path: '/api/notes', router: noteRouter },
];

info('connecting to MongoDB...');

mongoose
	.set('strictQuery', true)
	.connect(URI)
	.then(() => info('connected to MongoDB.'))
	.catch((err) => error('error connecting to MongoDB.', err.message));

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(morgan('dev'));

app.use(tokenExtractor);

routes.forEach((route) => app.use(route.path, route.router));

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
