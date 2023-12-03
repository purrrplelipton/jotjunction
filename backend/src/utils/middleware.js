import jwt from 'jsonwebtoken';
import { SECRET } from './config.js';
import { error } from './logger.js';

const { verify } = jwt;

const unknownEndpoint = (_, res) => {
	res.status(404).send({ err: 'unknown endpoint' });
};

const errorHandler = (err, _, res, nxt) => {
	error(err.message);
	const { name } = err;
	if (name === 'CastError') res.status(400).send({ error: 'malformatted id' });
	else if (name === 'ValidationError') res.status(400).json({ error: err.message });
	else if (name === 'JsonWebTokenError') res.status(401).json({ error: 'invalid token' });
	else if (name === 'TokenExpiredError') res.status(401).json({ error: 'token expired' });

	nxt(err);
};

const tokenExtractor = (req, _, nxt) => {
	const authToken = req.headers['authorization'];
	if (authToken && authToken.startsWith('Bearer ')) req.token = authToken.slice(7);

	nxt();
};

const userExtractor = (req, _, nxt) => {
	const token = req.token;
	if (token) {
		const decodedToken = verify(token, SECRET);
		req.user = decodedToken.id;
	}

	nxt();
};

export { errorHandler, tokenExtractor, unknownEndpoint, userExtractor };
