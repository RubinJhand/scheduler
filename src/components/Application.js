import React, { useState, Fragment } from 'react';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment/index';

const days = [
	{
		id: 1,
		name: 'Monday',
		spots: 2,
	},
	{
		id: 2,
		name: 'Tuesday',
		spots: 5,
	},
	{
		id: 3,
		name: 'Wednesday',
		spots: 0,
	},
];
const appointments = [
	{
		id: 1,
		time: '10am',
		interview: {
			student: 'Chef of the Muppets',
			interviewer: {
				id: 4,
				name: 'Cohana Roy',
				avatar: 'https://i.imgur.com/FK8V841.jpg',
			},
		},
	},
	{
		id: 2,
		time: '1pm',
		interview: {
			student: 'Lydia Miller-Jones',
			interviewer: {
				id: 1,
				name: 'Sylvia Palmer',
				avatar: 'https://i.imgur.com/LpaY82x.png',
			},
		},
	},
	{
		id: 3,
		time: '9am',
		interview: {
			student: 'Chunk from Goonies',
			interviewer: {
				id: 2,
				name: 'Tori Malcolm',
				avatar: 'https://i.imgur.com/Nmx0Qxo.png',
			},
		},
	},
	{
		id: 4,
		time: '830am',
		interview: {
			student: 'Glorianna de Souza',
			interviewer: {
				id: 3,
				name: 'Mildred Nazir',
				avatar: 'https://i.imgur.com/T2WwVfS.png',
			},
		},
	},
	{
		id: 5,
		time: '1pm',
		interview: {
			student: 'Claudius Augustus',
			interviewer: {
				id: 5,
				name: 'Sven Jones',
				avatar: 'https://i.imgur.com/twYrpay.jpg',
			},
		},
	},
];

export default function Application(props) {
	console.log(props);
	const [day, setDay] = useState('Monday');

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList days={days} day={day} setDay={setDay} />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{/* Replace this with the schedule elements during the "The Scheduler" activity. */}
				<Fragment>
					{appointments.map((appointment) => (
						<Appointment key={appointment.id} {...appointment} />
					))}
					<Appointment key={'last'} time={'5pm'} />
				</Fragment>
			</section>
		</main>
	);
}
