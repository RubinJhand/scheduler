const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };

    case SET_APPLICATION_DATA:
      const { days, appointments, interviewers } = action;
      return { ...state, days, appointments, interviewers };

    case SET_INTERVIEW: {
      const id = action.value.id;
      const interview = action.value.interview;
      const appointment = { ...state.appointments[id], interview };
      const appointments = { ...state.appointments, [id]: appointment };

      const spotsRemaining = (day) => {
        return !state.appointments[id].interview
          ? day.spots - 1
          : !interview
          ? day.spots + 1
          : day.spots;
      };

      const days = state.days.map((item) => {
        return item.appointments.includes(id)
          ? { ...item, spots: spotsRemaining(item) }
          : item;
      });

      return { ...state, days, appointments };
    }
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };
