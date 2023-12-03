import { Note, Spinner } from '@src/components';
import { Header, NavBar } from '@src/layouts';
import { fetchNotes } from '@src/services';
import { setNotes } from '@src/store/reducers';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styles from './styles.module.css';

function Home({ notes }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const initializeNotes = async () => {
			try {
				setLoading(true);
				const { data } = await fetchNotes();
				dispatch(setNotes(data));
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		};

		initializeNotes();
	}, []);

	return (
		<>
			<Header />
			<main className={styles.a} aria-live="polite">
				{loading && <Spinner />}
				{!loading && notes.length === 0 && (
					<h1 className={styles.b}>you have no notes right now</h1>
				)}
				{!loading && notes.length > 0 && notes.map((nt) => <Note key={nt._id} details={nt} />)}
			</main>
			<NavBar />
		</>
	);
}

const mapStateToProps = (state) => ({ notes: state.jotjunction.notes });

export default connect(mapStateToProps)(Home);
