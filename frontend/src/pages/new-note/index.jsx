import { IconChevronLeft, IconStar } from '@src/assets';
import { Spinner } from '@src/components';
import styles from '@src/pages/new-note/styles.module.css';
import { addNote } from '@src/services';
import { appendNote } from '@src/store/reducers';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NewNote() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [savingNote, setSavingNote] = React.useState(false);
	const [title, setTitle] = React.useState('');
	const [starred, setStarred] = React.useState(false);

	const saveNote = async (e) => {
		e.preventDefault();
		if (savingNote) return;

		const newNote = {
			title,
			note: e.target.note.value,
			starred,
		};

		try {
			setSavingNote(true);
			const { data } = await addNote(newNote);
			dispatch(appendNote(data));
			setTitle('');
			setStarred(false);
			e.target.note.value = '';
			navigate('/');
		} catch (error) {
			console.log(error.message);
		} finally {
			setSavingNote(false);
		}
	};

	return (
		<>
			<header className={styles.b}>
				<button aria-label="go back" type="button" onClick={() => navigate(-1)}>
					<IconChevronLeft />
				</button>
				<h1>{title.trim() ? title : 'New note'}</h1>
			</header>
			<main className={styles.a}>
				<form onSubmit={saveNote}>
					<div>
						<input
							placeholder="Title"
							id="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<label htmlFor="starred">
							<input
								aria-label={`${starred ? 'un' : ''}star this note`}
								type="checkbox"
								checked={starred}
								id="starred"
								onChange={(e) => setStarred(e.target.checked)}
								className="sr-only"
							/>
							<IconStar data-starred={starred} />
						</label>
					</div>
					<textarea rows="8" placeholder="Note" id="note" />
					<div>
						<button
							aria-label={savingNote ? 'saving note' : 'save note'}
							type="submit"
							aria-disabled={savingNote}
						>
							{savingNote ? <Spinner /> : 'save note'}
							{savingNote && <i />}
						</button>
					</div>
				</form>
			</main>
		</>
	);
}

export default NewNote;
