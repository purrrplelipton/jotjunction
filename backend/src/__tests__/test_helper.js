import { Note, User } from '../models/schemas.js';

export const noteList = [
	{
		title: 'about html',
		content: 'HTML is easy',
		important: false,
	},
	{
		title: 'browser facts',
		content: 'Browser can execute only Javascript',
		important: true,
	},
];

export async function nonExistingId() {
	const note = new Note({
		title: "note's title",
		content: 'content of the note',
		important: false,
	});
	await note.save();
	await note.remove();
	return note._id.toString();
}

export async function notesInDb() {
	const notes = await Note.find({});
	return notes.map((n) => n.toJSON());
}

export async function usersInDb() {
	const users = await User.find({});
	return users.map((n) => n.toJSON());
}
