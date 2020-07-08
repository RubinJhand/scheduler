import React from 'react';
import Button from '../Button.js';

export default function Confirm(props) {
	const { onConfirm, onCancel } = props;

	return (
		<main className='appointment__card appointment__card--confirm'>
			<h1 className='text--semi-bold'>Delete the appointment?</h1>
			<section className='appointment__actions'>
				<Button onClick={onCancel} danger>
					Cancel
				</Button>
				<Button onClick={onConfirm} danger>
					Confirm
				</Button>
			</section>
		</main>
	);
}
