import { IconChevronLeft } from '@src/assets';
import { getNote } from '@src/services';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';

function NoteView() {
	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		const fetchNote = async () => {
			try {
				const { data } = await getNote(id);
				console.log(data);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchNote();
	}, []);

	return (
		<>
			<header className={styles.a}>
				<button type="button" aria-label="go back" onClick={() => navigate(-1)}>
					<IconChevronLeft />
				</button>
			</header>
			<main className={styles.b}></main>
		</>
	);
}

export default NoteView;
