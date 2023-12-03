import { removeToken } from '@src/services';
import { IconChevronLeft } from '@src/assets';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { rhyan } from '@src/assets';

function MyAccount() {
	const navigate = useNavigate();

	return (
		<>
			<header className={styles.a}>
				<button type="button" aria-label="go back" onClick={() => navigate(-1)}>
					<IconChevronLeft />
				</button>
				<h1>Rhyan</h1>
			</header>
			<main className={styles.b}>
				<div className={styles.c}>
					<img src={rhyan} alt="" />
					<h2>rhyan@apple.id.com</h2>
				</div>
				<div>
					<button
						type="button"
						onClick={() => {
							removeToken();
							navigate('/sign-in');
						}}
					>
						<span>sign out</span>
					</button>
				</div>
			</main>
		</>
	);
}

export default MyAccount;
