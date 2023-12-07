import { updatePhoto } from '@src/services';
import React from 'react';
import styles from './styles.module.css';

function Modal({ hideModal }, ref) {
	const handleFileChange = async (e) => {
		const photo = e.target.files[0];
		if (photo) {
			const formData = new FormData();
			formData.append('photo', photo);
			try {
				const { data } = await updatePhoto(formData);
				console.log(data);
				hideModal();
			} catch (error) {
				console.log(error.message);
			}
		}
	};

	const handlePhotoRemoval = async () => {
		try {
			await removePhoto();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className={styles.a}>
			<div ref={ref}>
				<label htmlFor="photo">
					<input type="file" id="photo" className="sr-only" onChange={handleFileChange} />
					<span>upload photo</span>
				</label>
				<button type="button" onClick={handlePhotoRemoval}>
					<span>remove current photo</span>
				</button>
				<button type="button" onClick={hideModal}>
					<span>cancel</span>
				</button>
			</div>
		</div>
	);
}

export default React.memo(React.forwardRef(Modal));
