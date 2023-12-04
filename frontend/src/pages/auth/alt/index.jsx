import { IconBrandApple, IconBrandFacebook, IconBrandGoogle } from '@src/assets';
import React from 'react';
import styles from './styles.module.css';

function Alt() {
	return (
		<>
			<div className={styles.a}>
				<i />
				<span>or</span>
				<i />
			</div>
			<div className={styles.b}>
				<button type="button" aria-label="sign in with facebook">
					<IconBrandFacebook />
				</button>
				<button type="button" aria-label="sign in with google">
					<IconBrandGoogle />
				</button>
				<button type="button" aria-label="sign in with apple ID">
					<IconBrandApple />
				</button>
			</div>
		</>
	);
}

export default Alt;
