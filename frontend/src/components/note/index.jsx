import { IconClock } from '@src/assets';
import React from 'react';
import { Link } from 'react-router-dom';
import QuickActions from './quick-actions';
import styles from './styles.module.css';
import { IconStar } from '@src/assets';

function Note({ details }) {
	return (
		<div className={styles.a}>
			<Link className={styles.b} to={`/note/${details._id}`}>
				<div>
					<div>
						<h2 data-no-title={!Boolean(details.title)}>
							<span>{details.title || 'no title'}</span>
						</h2>
						<div>
							<p>{details.note}</p>
							<div>
								<IconStar data-starred={details.starred} />
								<div>
									<IconClock />
									<span>{details.createdAt}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
			<div>
				<QuickActions noteID={details._id} />
			</div>
		</div>
	);
}

export default React.memo(Note);
