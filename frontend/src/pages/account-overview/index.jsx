import { IconCamera, IconChevronLeft, IconSidebarRightExpand, IconUser, rhyan } from '@src/assets';
import { Spinner } from '@src/components';
import { getDetails } from '@src/services';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import styles from './styles.module.css';

function AccountOverview() {
	const navigate = useNavigate();
	const [sidebarShown, setSidebarShown] = React.useState(false);
	const [userDetails, setUserDetails] = React.useState(null);
	const [fetchingDetails, setFetchingDetails] = React.useState(false);

	React.useEffect(() => {
		async function fetchDetails() {
			try {
				setFetchingDetails(true);
				const { data } = await getDetails();
				setUserDetails(data);
			} catch (error) {
				console.log(error.message);
			} finally {
				setFetchingDetails(false);
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
					<div>
						{fetchingDetails && !userDetails && <Spinner />}
						{!fetchingDetails && userDetails && <img src={rhyan} alt="" loading="lazy" />}
						{!fetchingDetails && userDetails && (
							<label htmlFor="photo">
								<input type="file" id="photo" />
								<div>
									<IconCamera />
								</div>
							</label>
						)}
						{!fetchingDetails && !userDetails && <IconUser className={styles.null} />}
					</div>
					<h2>rhyan@apple.id.com</h2>
				</div>
				{sidebarShown && <Sidebar sidebarShown={sidebarShown} setSidebarShown={setSidebarShown} />}
			</main>
		</>
	);
}

export default AccountOverview;
