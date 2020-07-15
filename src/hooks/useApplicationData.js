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
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      return { ...state, days: action.days, appointments: action.appointments };
    }
    default:
      throw new Error(`: ${action.type}`);
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = { ...state.appointments, [id]: appointment };

    let { days } = state;

    if (!state.appointments[id].interview) {
      days = state.days.map((item) => {
        if (item.appointments.includes(id)) {
          item.spots = item.spots - 1;
          return item;
        } else return item;
      });
    }

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        if (response.status === 204) {
          dispatch({
            type: SET_INTERVIEW,
            appointments: appointments,
            days: days
          });
        }
      });
  };

  // const spots = (id) => {
  //   const appointment = { ...state.appointments[id], interview: null };
  //   const appointments = { ...state.appointments, [id]: appointment };

  //   const days = state.days.map((item) => {
  //     if (item.appointments.includes(id)) {
  //       return {
  //         ...(item ? item.spots - 1 : item.spots + 1)
  //       };
  //     } else return item;
  //   });
  // };

  const cancelInterview = (id, day) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const days = state.days.map((item) => {
      if (item.appointments.includes(id)) {
        item.spots = item.spots + 1;
        return item;
      } else return item;
    });

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      if (response.status === 204) {
        dispatch({ type: SET_INTERVIEW, days, appointments });
      }
    });
  };

  useEffect(() => {
    const daysPromise = axios.get('/api/days');
    const appointmentsPromise = axios.get('/api/appointments');
    const interviewersPromise = axios.get('/api/interviewers');

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
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
      })
      .catch((error) => console.log(error));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
