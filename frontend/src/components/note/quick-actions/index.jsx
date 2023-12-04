import { deleteNote } from '@src/services';
import { removeNote } from '@src/store/reducers';
import { IconTrash, IconDotsVertical } from '@src/assets';
import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

function QuickActionsContainer({ noteID }) {
	const dispatch = useDispatch();
	const [actionsVisibilityShown, setActionsVisibilityShown] = React.useState(false);
	const containerRef = React.useRef(null);

	React.useEffect(() => {
		if (actionsVisibilityShown) document.body.classList.add('xoxo');
		return () => document.body.classList.remove('xoxo');
	}, [actionsVisibilityShown]);

	React.useEffect(() => {
		const handleOutsideClick = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setActionsVisibilityShown(false);
			}
		};
		const handleOutsideFocus = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setActionsVisibilityShown(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('focusin', handleOutsideFocus);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('focusin', handleOutsideFocus);
		};
	}, []);

	const actions = [
		{
			fn: async () => {
				try {
					await deleteNote(noteID);
					dispatch(removeNote(noteID));
				} catch (error) {
					console.log(error.message);
				}
			},
			icon: <IconTrash />,
			label: 'delete note',
		},
	];

	return (
		<div className={styles.a} ref={containerRef}>
			<button
				type="button"
				aria-label={`${actionsVisibilityShown ? 'hide' : 'show'} quick actions`}
				onClick={() => setActionsVisibilityShown((prvState) => !prvState)}
			>
				<IconDotsVertical />
			</button>
			{actionsVisibilityShown && (
				<ul className={styles.b}>
					{actions.map((ctn) => (
						<li key={uuidv4()}>
							<button type="button" onClick={ctn.fn}>
								{ctn.label && <span>{ctn.label}</span>}
								{ctn.icon && ctn.icon}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default QuickActionsContainer;
