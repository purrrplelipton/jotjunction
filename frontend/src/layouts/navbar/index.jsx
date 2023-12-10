import { IconLayoutList, IconPlus, IconTags, IconUser } from '@src/assets';
import { Spinner } from '@src/components';
import { initializeDetails } from '@src/store/reducers';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

function NavBar({ user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const setDetails = async () => {
			try {
				setLoading(true);
				await dispatch(initializeDetails());
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		};

		setDetails();
	}, []);

	const navbarItems = [
		{ child: <IconPlus />, fn: () => navigate('/new-note'), label: 'create a new note' },
		{ child: <IconTags />, fn: () => {}, label: 'go to my tags page' },
		{
			child:
				loading && !user ? (
					<Spinner />
				) : !loading && user && user.photo ? (
					<img src={user._id + '/' + user.photo} alt="my profile photo" />
				) : (
					<IconUser />
				),
			fn: () => {
				if (user) return navigate('/account-overview');
				const prompt = confirm('sign in to view account info');
				if (prompt) return navigate('/sign-in');
			},
			label: 'got to my account overview page',
		},
	];

	return (
		<footer className={styles.a}>
			<NavLink
				className={(props) => (props.isActive ? styles.x : '')}
				to="/"
				aria-label="go to home page"
			>
				<IconLayoutList />
			</NavLink>
			{navbarItems.map((nbItm) => (
				<button key={uuidv4()} type="button" onClick={nbItm.fn} aria-label={nbItm.label}>
					{nbItm.child}
				</button>
			))}
		</footer>
	);
}

const mapStateToProps = (state) => ({ user: state.jotjunction.user });

export default connect(mapStateToProps)(NavBar);
