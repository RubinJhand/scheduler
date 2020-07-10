export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const filterAppointment = days.filter(
    (filterValue) => filterValue.name === day
  );
  if (filterAppointment.length) {
    const appointmentOfDay = filterAppointment[0].appointments.map(
      (mapValue) => appointments[mapValue]
    );
    return appointmentOfDay;
  } else return [];
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const { student, interviewer } = interview;
  const { interviewers } = state;
  return {
    student,
    interviewer: interviewers[interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filterAppointment = days.filter(
    (filterValue) => filterValue.name === day
  );
  if (filterAppointment.length) {
    const appointmentOfDay = filterAppointment[0].interviewers.map(
      (mapValue) => interviewers[mapValue]
    );
    return appointmentOfDay;
  } else return [];
}
