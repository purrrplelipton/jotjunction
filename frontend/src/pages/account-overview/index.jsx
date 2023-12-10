import { IconCamera, IconChevronLeft, IconSidebarRightExpand, IconUser } from '@src/assets';
import { Spinner } from '@src/components';
import { getDetails } from '@src/services';
import { setUser } from '@src/store/reducers';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import Sidebar from './sidebar';
import styles from './styles.module.css';

function AccountOverview({ user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);
	const [showSidebar, setShowSidebar] = React.useState(false);
	const [showOptions, setShowOptions] = React.useState(false);

	React.useEffect(() => {
		async function fetchDetails() {
			try {
				setLoading(true);
				const { data } = await getDetails();
				dispatch(setUser(data));
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		}

		fetchDetails();
	}, []);

	const actionsContainerRef = React.useRef(null);

	React.useEffect(() => {
		if (showOptions) document.body.classList.add('xoxo');
		return () => document.body.classList.remove('xoxo');
	}, [showOptions]);

	React.useEffect(() => {
		const handleOutsideClick = (e) => {
			if (actionsContainerRef.current && !actionsContainerRef.current.contains(e.target)) {
				setShowOptions(false);
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
				<button type="button" aria-label="show sidebar" onClick={() => setShowSidebar(true)}>
					<IconSidebarRightExpand />
				</button>
			</header>
			<main className={styles.b}>
				<div className={styles.c}>
					<div>
						{loading && !user && <Spinner />}
						{!loading && (!user || !user.photo) && <IconUser />}
						{!loading && user && user.photo && <img src={user._id + '/' + user.photo} alt="" />}
						{!loading && user && (
							<button
								type="button"
								onClick={() => setShowOptions(true)}
								aria-label="set or change profile photo"
							>
								<IconCamera />
							</button>
						)}
					</div>
					<h2>rhyan@apple.id.com</h2>
				</div>
				{showOptions && <Modal hideModal={() => setShowOptions(false)} ref={actionsContainerRef} />}
				{showSidebar && <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
			</main>
		</>
	);
}

const mapStateToProps = (state) => ({ user: state.jotjunction.user });

export default connect(mapStateToProps)(AccountOverview);
