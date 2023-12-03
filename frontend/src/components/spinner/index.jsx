import { IconSpinner } from '@src/assets';
import React from 'react';
import styles from './styles.module.css';

function Spinner({ children }) {
	return (
		<div className={styles.a}>
			<div>
				<IconSpinner />
				{children && <div className={styles.b}>{children}</div>}
			</div>
		</div>
	);
}

export default Spinner;
