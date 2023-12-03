import styles from './styles.module.css';
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import React from 'react';

function Alt() {
	return (
		<>
			<div className={styles.separator}>
				<i />
				<span>or</span>
				<i />
			</div>
			<div className={styles.socialButtons}>
				<button type="button" aria-label="Sign in with facebook">
					<IconBrandFacebook />
				</button>
				<button type="button" aria-label="Sign in with google">
					<IconBrandGoogle />
				</button>
				<button type="button" aria-label="Sign in with apple ID">
					<IconBrandApple />
				</button>
			</div>
		</>
	);
}

export default Alt;
