import { Spinner } from '@src/components';
import { signIn } from '@src/services';
import { IconEye, IconEyeOff } from '@src/assets';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alt from '../alt';
import styles from './styles.module.css';

function SignIn() {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = React.useState(false);
	const [signingIn, setSigningIn] = React.useState(false);

	const logInHandler = async (e) => {
		e.preventDefault();
		if (signingIn) return;
		const credentials = {
			username: e.target.username.value,
			password: e.target.password.value,
			remember: e.target.remember.checked,
		};
		try {
			setSigningIn(true);
			await signIn(credentials);
			navigate('/', { replace: true });
		} catch (error) {
			console.log(error.message);
		} finally {
			setSigningIn(false);
		}
	};

	return (
		<main className={styles.a}>
			<h1>Welcome back!</h1>
			<form className={styles.b} onSubmit={logInHandler}>
				<input type="text" id="username" placeholder="username | email" />
				<div className={styles.c}>
					<input type={showPassword ? 'text' : 'password'} id="password" placeholder="password" />
					<button
						type="button"
						aria-label={showPassword ? 'hide password' : 'reveal password'}
						onClick={() => setShowPassword((prvState) => !prvState)}
					>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</button>
				</div>
				<div className={styles.d}>
					<label htmlFor="remember">
						<input type="checkbox" id="remember" />
						<span>remember me</span>
					</label>
					<Link to="/reset">forgot password</Link>
				</div>
				<button
					type="submit"
					aria-label={signingIn ? 'signing you in' : 'sign in'}
					aria-disabled={signingIn}
				>
					{signingIn ? <Spinner /> : 'sign in'}
					{signingIn && <i />}
				</button>
			</form>
			<Alt />
			<p>
				Don't have an account?&nbsp;
				<Link to="/register">Register</Link>
			</p>
		</main>
	);
}

export default SignIn;
