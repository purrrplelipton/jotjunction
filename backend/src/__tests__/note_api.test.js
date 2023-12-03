import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import { Note, User } from '../models/schemas.js';
import { nonExistingId, noteList, notesInDb, usersInDb } from './test_helper.js';

const api = supertest(app);

describe('when there is initially some notes saved', function () {
	beforeEach(async function () {
		await Note.deleteMany({});
		Note.insertMany(noteList);
	});

	test('notes are returned as json', async function () {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('all notes are returned', async function () {
		const res = await api.get('/api/notes');
		expect(res.body).toHaveLength(noteList.length);
	});

	test('a specific note is within the returned notes', async function () {
		const res = await api.get('/api/notes');
		const contents = res.body.map((r) => r.content);
		expect(contents).toContain('Browser can execute only Javascript');
	});

	describe('viewing a particular note', function () {
		test('succeeds with a valid id', async function () {
			const notesAtStart = await notesInDb();
			console.log(notesAtStart);
			const noteToView = notesAtStart[0];

			const resultNote = await api
				.get(`/api/notes/${noteToView.id}`)
				.expect(200)
				.expect('Content-Type', /application\/json/);

			const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
			expect(resultNote.body).toEqual(processedNoteToView);
		});

		test('fails with statuscode 404 if note does not exist', async function () {
			const validNonexistingId = await nonExistingId();
			await api.get(`/api/notes/${validNonexistingId}`).expect(404);
		});

		test('test fails with statuscode 400 if id is invalid', async function () {
			const invalidId = '5a3d5da59070081a82a3445';
			await api.get(`/api/notes/${invalidId}`).expect(400);
		});

		describe('note addition', function () {
			test('succeeds with valid data', async function () {
				const newNote = {
					title: 'Async/Await',
					content: 'async/await simplifies making async calls',
					important: true,
				};

				await api
					.post('/api/notes')
					.send(newNote)
					.expect(201)
					.expect('Content-Type', /application\/json/);

				const res = await notesInDb();
				expect(res).toHaveLength(noteList.length + 1);

				const contents = res.map((r) => r.content);
				expect(contents).toContain(newNote.content);
			});

			test('fails with statuscode 400 if data invalid', async function () {
				const newNote = { important: true };

				await api.post('/api/notes').send(newNote).expect(400);

				const res = await notesInDb();
				expect(res).toHaveLength(noteList.length);
			});
		});

		describe('note deletion', function () {
			test('succeeds with status code 204 if id is valid', async function () {
				const notesAtStart = await notesInDb();
				const noteToDelete = notesAtStart[0];

				await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

				const notesAtEnd = await notesInDb();
				expect(notesAtEnd).toHaveLength(noteList.length - 1);

				const contents = notesAtEnd.map((r) => r.content);
				expect(contents).not.toContain(noteToDelete.content);
			});
		});
	});

	describe('when there is initially one user in db', function () {
		beforeEach(async function () {
			await User.deleteMany({});

			const user = new User({
				username: 'root',
				password: await bcrypt.hash('sekret', 10),
			});

			await user.save();
		});

		test('creation succeeds with fresh username', async function () {
			const usersAtStart = await usersInDb();

			const newUser = {
				username: 'mluukkai',
				name: 'Matti Luukkainen',
				password: 'salainen',
			};

			await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const usersAtEnd = await usersInDb();
			expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

			const usernames = usersAtEnd.map((u) => u.username);
			expect(usernames).toContain(newUser.username);
		});

		test('creation fails with proper statuscode and message if username already taken', async function () {
			const usersAtStart = await usersInDb();

			const newUser = {
				username: 'root',
				name: 'Superuser',
				password: 'salainen',
			};

			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			expect(result.body.error).toContain('expected `username` to be unique');

			const usersAtEnd = await usersInDb();
			expect(usersAtEnd).toEqual(usersAtStart);
		});
	});
});

afterAll(async function () {
	await mongoose.connection.close();
});
