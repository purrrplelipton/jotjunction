import { IconSearch, IconX } from '@src/assets';
import { findNote } from '@src/services';
import { setSearchQuery } from '@src/store/reducers';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styles from './styles.module.css';

function Header(props) {
	const { searchQuery } = props;
	const dispatch = useDispatch();

	const doSearch = async (e) => {
		e.preventDefault();
		dispatch(setSearchQuery(e.target.value));
		try {
			const { data } = await findNote(searchQuery);
			dispatch(setSearchResults(data));
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<header className={styles.a}>
			<label className={styles.b}>
				<IconSearch />
				<input
					id="searchField"
					type="text"
					placeholder="Search"
					value={searchQuery}
					onChange={doSearch}
				/>
				{searchQuery.trim() && (
					<button type="button" onClick={() => dispatch(setSearchQuery(''))}>
						<IconX />
					</button>
				)}
			</label>
		</header>
	);
}

const mapStateToProps = (state) => ({ searchQuery: state.jotjunction.searchQuery });

export default connect(mapStateToProps)(Header);
