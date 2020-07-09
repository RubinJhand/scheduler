import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment/index';

import { getAppointmentsForDay } from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const appointmentList = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
        />
      );
    }
  );

  useEffect(() => {
    const daysPromise = axios.get('/api/days');
    const appointmentsPromise = axios.get('/api/appointments');
    Promise.all([daysPromise, appointmentsPromise]).then((svar) => {
      setState((prev) => ({
        ...prev,
        days: svar[0].data,
        appointments: svar[1].data,
      }));
    });
  }, []);

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointmentList}
        <Appointment key={'last'} time={'5pm'} />
      </section>
    </main>
  );
}
