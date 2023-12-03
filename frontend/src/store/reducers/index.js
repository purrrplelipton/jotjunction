import { createSlice } from '@reduxjs/toolkit';

const jotJunction = createSlice({
	name: 'jotJunction',
	initialState: { user: null, notes: [], searchQuery: '' },
	reducers: {
		setUser: (state, action) => {
			return { ...state, user: action.payload };
		},
		setNotes: (state, action) => {
			return { ...state, notes: action.payload };
		},
		appendNote: (state, action) => {
			return { ...state, notes: [state.notes, action.payload] };
		},
		removeNote: (state, action) => {
			return { ...state, notes: state.notes.filter((nt) => nt._id !== action.payload) };
		},
		setSearchQuery: (state, action) => {
			return { ...state, searchQuery: action.payload };
		},
	},
});

export const { setUser, setNotes, appendNote, removeNote, setSearchQuery } = jotJunction.actions;
export default jotJunction.reducer;
