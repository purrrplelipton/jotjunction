import { compare, hash } from 'bcrypt';
import { Router } from 'express';
import fs from 'fs';
import pkg from 'jsonwebtoken';
import multer, { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Note, User } from '../models/schemas.js';
import { HASH_COMPLEXITY, SECRET } from '../utils/config.js';
import { userExtractor } from '../utils/middleware.js';

const [userRouter, noteRouter] = await Promise.all([Router(), Router()]);
const { sign } = pkg;

const config = multer({
	storage: diskStorage({
		filename: (_, file, cb) => {
			const fn = file.originalname;
			const ext = fn.slice(fn.lastIndexOf('.'));
			cb(null, `${uuidv4()}${ext}`);
		},
		destination: (req, _, cb) => {
			const uploadDir = `profile-photos/${req.user}`;
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}
			cb(null, uploadDir);
		},
	}),
	fileFilter: function (_, file, cb) {
		if (!file.mimetype.match(/image\/.*/)) {
			return cb(new Error('Only images are allowed'));
		}
		cb(null, true);
	},
	limits: {
		fileSize: 1024 * 1024 * 2, // 2MB
	},
});

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

userRouter.patch('/', userExtractor, config.single('photo'), async (req, res) => {
	const updatedUser = await User.findByIdAndUpdate(
		req.user,
		{ ...req.body, photo: req.file.filename },
		{ new: true, runValidators: true, context: 'query' },
	);
	if (updatedUser) res.json(updatedUser);
});

userRouter.post('/sign-in', async (req, res) => {
	const { username, password, remember } = req.body;

	const user = await User.findOne({ $or: [{ email: username }, { username }] });
	const passwordCorrect = user === null ? false : await compare(password, user.password);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({ error: 'invalid username or password' });
	}

	const token = sign(user._id, SECRET, { expiresIn: remember ? '30d' : '1d' });

	res.status(200).send({ token });
});

noteRouter.get('/', userExtractor, async (req, res) => {
	const user = await User.findById(req.user);
	if (user) {
		const notes = await Note.find({ author: user._id });
		res.json(notes);
	}
});

noteRouter.get('/:id', userExtractor, async (req, res) => {
	const user = await User.findById(req.user);
	if (user) {
		const notes = await Note.find({ author: user._id });
		const note = notes.find((nt) => String(nt._id) === req.params.id);
		res.json(note);
	}
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
		user.notes = await user.notes.filter((noteID) => noteID !== req.params.id);
		await user.save();
		res.status(204).end();
	}
});

export { noteRouter, userRouter };
