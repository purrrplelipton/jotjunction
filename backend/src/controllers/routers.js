import { compare, hash } from 'bcrypt';
import { Router } from 'express';
import pkg from 'jsonwebtoken';
import { Note, User } from '../models/schemas.js';
import { HASH_COMPLEXITY, SECRET } from '../utils/config.js';
import { userExtractor } from '../utils/middleware.js';

const [userRouter, noteRouter] = await Promise.all([Router(), Router()]);
const { sign } = pkg;

userRouter.get('/', userExtractor, async (req, res) => {
	const user = await User.findById(req.user);
	if (user) {
		return res.json(user);
	}
});

userRouter.post('/register', async (req, res) => {
	const { username, password } = req.body;

	const user = new User({
		username,
		password: await hash(password, parseInt(HASH_COMPLEXITY)),
	});

	const savedUser = await user.save();
	res.status(201).json(savedUser);
});

userRouter.post('/sign-in', async (req, res) => {
	const { username, password, remember } = req.body;

	const user = await User.findOne({ $or: [{ email: username }, { username }] });
	const passwordCorrect = user === null ? false : await compare(password, user.password);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({ error: 'invalid username or password' });
	}

	const token = sign({ id: user._id }, SECRET, { expiresIn: remember ? '30d' : '1d' });

	res.status(200).send({ id: user._id, token });
});

noteRouter.get('/', userExtractor, async (req, res) => {
	const user = await User.findById(req.user);
	if (user) {
		const notes = await Note.find({ author: user._id });
		res.json(notes);
	}
});

noteRouter.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id);
	res.json(note);
});

/*  */

noteRouter.post('/', userExtractor, async (req, res) => {
	const user = await User.findById(req.user);

	const note = new Note(req.body);

	const savedNote = await note.save();
	user.notes = await user.notes.concat(savedNote._id);
	await user.save();
	res.json(savedNote);
});

noteRouter.put('/:id', async (req, res) => {
	const updatedNote = await Note.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		{ new: true, runValidators: true, context: 'query' },
	);
	res.json(updatedNote);
});

noteRouter.delete('/:id', userExtractor, async (req, res) => {
	const user = await User.findById(req.user);
	if (user) {
		await Note.findByIdAndDelete(req.params.id);
		res.status(204).end();
	}
});

export { noteRouter, userRouter };
