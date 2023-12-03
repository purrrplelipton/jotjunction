import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Note from '.';

test('should render content', () => {
	const d = {
		title: 'testing web apps',
		note: 'Component testing is done with react-testing library',
		starred: true,
		createdAt: '2023-11-30T15:56:34.250+00:00',
	};

	const mockHandler = jest.fn();

	render(<Note details={d} />);

	const user = userEvent.setup()
	const button = screen.getByLabelText('show quick actions')
	await user.click(button)

	expect(mockHandler.mock.calls).toHaveLength(1);
});
