import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// NOTE SCHEMA

const noteSchema = new mongoose.Schema(
	{
		title: String,
		note: String,
		starred: Boolean,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_, doc) => {
				delete doc.__v;
			},
		},
	},
);

const Note = mongoose.model('Note', noteSchema);

// USER SCHEMA

const userSchema = mongoose.Schema(
	{
		username: { type: String, required: true },
		photo: { type: String },
		password: String,
		notes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Note',
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_, doc) => {
				delete doc.__v;
				delete doc.password;
			},
		},
	},
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

export { Note, User };
