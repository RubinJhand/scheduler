const appointmentInterviewHelper = (state, day, appOrInt) => {
  const { days } = state;
  let stateOfAppointOrInter = '';

  const filterAppointment = days.filter(
    (filterValue) => filterValue.name === day
  );

  if (appOrInt === 'appointments') {
    const { appointments } = state;
    stateOfAppointOrInter = appointments;
  } else if (appOrInt === 'interviewers') {
    const { interviewers } = state;
    stateOfAppointOrInter = interviewers;
  }

  if (filterAppointment.length) {
    const appointmentOfDay = filterAppointment[0][appOrInt].map(
      (mapValue) => stateOfAppointOrInter[mapValue]
    );
    return appointmentOfDay;
  } else return [];
};

export function getAppointmentsForDay(state, day) {
  return appointmentInterviewHelper(state, day, 'appointments');
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const { student, interviewer } = interview;
  const { interviewers } = state;
  return { student, interviewer: interviewers[interviewer] };
}

export function getInterviewersForDay(state, day) {
  return appointmentInterviewHelper(state, day, 'interviewers');
}
