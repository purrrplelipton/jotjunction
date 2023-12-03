import { Spinner } from '@src/components';
import { doOnboarding } from '@src/services';
import { IconEye, IconEyeOff } from '@src/assets';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alt from '../alt';
import styles from './styles.module.css';

function Register() {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = React.useState(false);
	const [resgistering, setRegistering] = React.useState(false);

	const registrationHandler = async (e) => {
		e.preventDefault();
		if (resgistering) return;
		const credentials = {
			username: e.target.email.value,
			password: e.target.password_.value,
			passwordConfirmation: e.target._password.value,
		};
		try {
			setRegistering(true);
			const { data } = await doOnboarding(credentials);
			console.log({ data });
			navigate('/sign-in', { replace: true });
		} catch (error) {
			console.log(error.message);
		} finally {
			setRegistering(false);
		}
	};

	return (
		<main className={styles.a}>
			<h1>Join the family!</h1>
			<form className={styles.b} onSubmit={registrationHandler}>
				<input type="email" id="email" placeholder="email" />
				<div>
					<input type={showPassword ? 'text' : 'password'} id="password_" placeholder="password" />
					<button
						type="button"
						aria-label={showPassword ? 'Hide password' : 'Reveal password'}
						onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
					>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</button>
				</div>
				<input type="password" id="_password" placeholder="re-type password" />
				<button
					type="submit"
					aria-label={resgistering ? 'creating your account' : 'create account'}
					aria-disabled={resgistering}
				>
					{resgistering ? <Spinner /> : 'create account'}
					{resgistering && <i />}
				</button>
			</form>
			<Alt />
			<p className={styles.d}>
				Already have an account?&nbsp;
				<Link to="/sign-in">sign in</Link>
			</p>
		</main>
	);
}

export default Register;
