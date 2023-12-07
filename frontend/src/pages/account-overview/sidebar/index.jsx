import { IconSidebarRightCollapse, IconSignOut } from '@src/assets';
import { removeToken } from '@src/services';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Sidebar({ sidebarShown, setSidebarShown }) {
	const navigate = useNavigate();
	const sidebarRef = React.useRef(null);

	React.useEffect(() => {
		if (sidebarShown) document.body.classList.add('xoxo');
		return () => document.body.classList.remove('xoxo');
	}, [sidebarShown]);

	React.useEffect(() => {
		const handleOutsideClick = (e) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				setSidebarShown(false);
			}
		};
		const handleOutsideFocus = (e) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				setSidebarShown(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('focusin', handleOutsideFocus);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('focusin', handleOutsideFocus);
		};
	}, []);

	return (
		<aside ref={sidebarRef} className={styles.a}>
			<div>
				<div className={styles.c}>
					<header>
						<button type="button" aria-label="hide sidebar" onClick={() => setSidebarShown(false)}>
							<IconSidebarRightCollapse />
						</button>
					</header>
				</div>
				<button
					className={styles.b}
					type="button"
					onClick={() => {
						removeToken();
						navigate('/sign-in');
					}}
				>
					<IconSignOut />
					<span>sign out</span>
				</button>
			</div>
		</aside>
	);
}

export default Sidebar;
