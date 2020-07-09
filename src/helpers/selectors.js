export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  //Find name that matches provided day
  const filterAppointment = days.filter((data) => data.name === day);
  //Validate if there is an appointment for the day
  if (filterAppointment.length) {
    //Match id to state.appointments
    const appointmentOfDay = filterAppointment[0].appointments.map(
      (value) => appointments[value]
    );
    return appointmentOfDay;
  } else return [];
}

/*
.filter()
  filter produces new array with same values, IF the iterator function returns true
- Don't get it mixed up with validation check!
*/
