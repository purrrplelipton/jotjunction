import { IconChevronLeft, IconSidebarRightExpand, rhyan } from '@src/assets';
import { getDetails } from '@src/services';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import styles from './styles.module.css';

function AccountOverview() {
	const navigate = useNavigate();
	const [sidebarShown, setSidebarShown] = React.useState(false);
	const [userDetails, setUserDetails] = React.useState(null);

	React.useEffect(() => {
		async function fetchDetails() {
			try {
				const { data } = await getDetails();
				setUserDetails(data);
			} catch (error) {
				console.log(error.message);
			}
		}

		fetchDetails();
	}, []);

	return (
		<>
			<header className={styles.a}>
				<button type="button" aria-label="go back" onClick={() => navigate(-1)}>
					<IconChevronLeft />
				</button>
				<p>Account Overview</p>
				<button type="button" aria-label="show sidebar" onClick={() => setSidebarShown(true)}>
					<IconSidebarRightExpand />
				</button>
			</header>
			<main className={styles.b}>
				<div className={styles.c}>
					<img src={rhyan} alt="" />
					<h2>rhyan@apple.id.com</h2>
				</div>
				{sidebarShown && <Sidebar sidebarShown={sidebarShown} setSidebarShown={setSidebarShown} />}
			</main>
		</>
	);
}

export default AccountOverview;
