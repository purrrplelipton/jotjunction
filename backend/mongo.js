import { hash } from 'bcrypt';
import { connect, connection, set } from 'mongoose';
import { argv } from 'process';
import { Note, User } from 'models/schemas';

if (argv.length < 3) {
	console.log('give password as an argument');
	process.exit(1);
}

const password = argv[2];

const url = `mongodb+srv://db:${password}@db.qrfzcig.mongodb.net/jotjunction?retryWrites=true&w=majority`;
set('strictQuery', true);
connect(url, { useNewUrlParser: true });

const note = new Note({
	title: argv[4],
	content: argv[5],
	important: Boolean(argv[6]),
});

const user = new User({
	name: argv[4],
	username: argv[5],
	password: argv[6],
});

async function save_user(user_props) {
	const modified_props = {
		name: user_props.name,
		username: user_props.username,
		password: await hash(user_props.password, 10),
	};
	modified_props.save().then(() => {
		console.log('new user created.');
		connection.close();
	});
}

if (argv.length == 6 && argv[3] == 'note') {
	note.save().then(() => {
		console.log('note added.');
		connection.close();
	});
} else if (argv.length == 6 && argv[3] == 'user') {
	const user_props = {
		name: user.name,
		username: user.username,
		password: user.password,
	};
	save_user(user_props);
} else if (argv.length == 4 && argv[3] == 'notes') {
	Note.find({}).then((notes) => {
		notes.forEach((note) => console.log(note));
		connection.close();
	});
} else if (argv.length == 4 && argv[3] == 'users') {
	User.find({}).then((users) => {
		users.forEach((user) => console.log(user));
		connection.close();
	});
} else if (argv.length == 4) {
	console.log('incomplete argument');
} else {
	console.log('something went wrong');
}
