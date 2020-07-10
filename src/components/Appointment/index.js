import React from 'react';

import './styles.scss';

import Show from './Show';
import Empty from './Empty';
import Header from './Header';
import Form from 'components/Appointment/Form';

import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const { interview, time } = props;

  //if (interview) then SHOW, if empty then EMPTY
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && (
        //update onAdd to transition to CREATE mode
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {/* when mode = CREATE show Form component */}
      {mode === CREATE && (
        //onCancel use back function to return to EMPTY state
        <Form interviewers={[]} onCancel={() => back()} />
      )}
    </article>
  );
}
