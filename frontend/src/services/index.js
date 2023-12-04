import axios from 'axios';

const TOKEN_KEY = 'jj_token';

export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
	localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
	localStorage.removeItem(TOKEN_KEY);
}

const usersApi = axios.create({ baseURL: '/api/users' });

export async function getDetails() {
	try {
		const { data } = await usersApi.get('/', {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		return { data };
	} catch (error) {
		throw error;
	}
}

export async function signIn(credentials) {
	try {
		const {
			data: { id, token },
		} = await usersApi.post('/sign-in', credentials);
		setToken(token);
		return { id };
	} catch (error) {
		throw error;
	}
}

export async function doOnboarding(credentials) {
	try {
		const { data } = await usersApi.post('/register', credentials);
		return { data };
	} catch (error) {
		throw error;
	}
}

const notesApi = axios.create({
	baseURL: '/api/notes',
	headers: { Authorization: `Bearer ${getToken()}` },
});

export async function fetchNotes() {
	try {
		const { data } = await notesApi.get('/');
		return { data };
	} catch (error) {
		throw error;
	}
}

export async function findNote(query) {
	try {
		const { data } = await notesApi.get('/', { params: { query } });
		return { data };
	} catch (error) {
		throw error;
	}
}

export async function addNote(note) {
	try {
		const { data } = await notesApi.post('/', note);
		return { data };
	} catch (error) {
		throw error;
	}
}

export async function deleteNote(id) {
	try {
		const response = await notesApi.delete(`/${id}`);
		return response;
	} catch (error) {
		throw error;
	}
}

export async function viewNote(id) {
	try {
		const { data } = await notesApi.get(`/${id}`);
		return { data };
	} catch (error) {
		throw error;
	}
}
