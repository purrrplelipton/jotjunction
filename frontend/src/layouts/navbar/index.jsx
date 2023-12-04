import { IconLayoutList, IconPlus, IconTags, rhyan } from '@src/assets';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

function NavBar() {
	const navigate = useNavigate();

	const navbarItems = [
		{ child: <IconPlus />, fn: () => navigate('new-note'), label: 'create a new note' },
		{ child: <IconTags />, fn: () => {}, label: 'go to my tags page' },
		{
			child: <img src={rhyan} alt="" />,
			fn: () => navigate('account-overview'),
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

export default NavBar;
