import { IconSidebarRightCollapse, IconSignOut } from '@src/assets';
import { removeToken } from '@src/services';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Sidebar({ showSidebar, setShowSidebar }) {
	const navigate = useNavigate();
	const sidebarRef = React.useRef(null);

	React.useEffect(() => {
		if (showSidebar) document.body.classList.add('xoxo');
		return () => document.body.classList.remove('xoxo');
	}, [showSidebar]);

	React.useEffect(() => {
		const handleOutsideClick = (e) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				setShowSidebar(false);
			}
		};
		const handleOutsideFocus = (e) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				setShowSidebar(false);
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
						<button type="button" aria-label="hide sidebar" onClick={() => setShowSidebar(false)}>
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
