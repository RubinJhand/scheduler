import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from 'reducers/application';

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
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      if (response.status === 204) {
        dispatch({ type: SET_INTERVIEW, value: { id, interview: null } });
      }
    });
  };

  useEffect(() => {
    const daysPromise = axios.get('/api/days');
    const appointmentsPromise = axios.get('/api/appointments');
    const interviewersPromise = axios.get('/api/interviewers');

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise]).then(
      (response) => {
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
