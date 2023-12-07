import { IconCamera, IconChevronLeft, IconSidebarRightExpand, IconUser, rhyan } from '@src/assets';
import { Spinner } from '@src/components';
import { getDetails } from '@src/services';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import Sidebar from './sidebar';
import styles from './styles.module.css';

function AccountOverview() {
	const navigate = useNavigate();
	const [sidebarShown, setSidebarShown] = React.useState(false);
	const [userDetails, setUserDetails] = React.useState(null);
	const [fetchingDetails, setFetchingDetails] = React.useState(false);
	const [uploadOptionVisible, setUploadOptionVisible] = React.useState(false);

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

	const actionsContainerRef = React.useRef(null);

	React.useEffect(() => {
		if (uploadOptionVisible) document.body.classList.add('xoxo');
		return () => document.body.classList.remove('xoxo');
	}, [uploadOptionVisible]);

	React.useEffect(() => {
		const handleOutsideClick = (e) => {
			if (actionsContainerRef.current && !actionsContainerRef.current.contains(e.target)) {
				setUploadOptionVisible(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
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
						{!fetchingDetails && userDetails && userDetails.photo && (
							<img src={userDetails.photo} alt="" />
						)}
						{!fetchingDetails && userDetails && (
							<button
								type="button"
								onClick={() => setUploadOptionVisible(true)}
								aria-label="set or change profile photo"
							>
								<IconCamera />
							</button>
						)}
						{!fetchingDetails && (!userDetails || !userDetails.photo) && (
							<IconUser className={styles.null} />
						)}
					</div>
					<h2>rhyan@apple.id.com</h2>
				</div>
				{uploadOptionVisible && (
					<Modal hideModal={() => setUploadOptionVisible(false)} ref={actionsContainerRef} />
				)}
				{sidebarShown && <Sidebar sidebarShown={sidebarShown} setSidebarShown={setSidebarShown} />}
			</main>
		</>
	);
}

export default AccountOverview;
