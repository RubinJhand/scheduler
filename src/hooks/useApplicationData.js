import { useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

function reducer(state, action) {
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

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: SET_INTERVIEW, value: { id, interview } });
        }
      });
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: SET_INTERVIEW, value: { id, interview: null } });
        }
    });
  };

  useEffect(() => {
    const daysPromise = axios.get('/api/days');
    const appointmentsPromise = axios.get('/api/appointments');
    const interviewersPromise = axios.get('/api/interviewers');

    Promise
      .all([daysPromise, appointmentsPromise, interviewersPromise])
      .then((response) => {
        const days = response[0].data;
        const appointments = response[1].data;
        const interviewers = response[2].data;

        dispatch({
          type: SET_APPLICATION_DATA,
          days,
          appointments,
          interviewers
        });
      }
    );
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
