import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const { onCancel, interviewers } = props;
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    onCancel();
  };

  const validate = () => {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
      //To pass test for saving student name without selecting interviewer comment 'out' the designated lines
      //By commenting out code, appointment is saved with only student name
    } else if (!interviewer) { // comment this line to pass test
      setError('Select an interviewer'); // comment this line to pass test
      return; // comment this line to pass test
    } else {
      setError('');
      props.onSave(name, interviewer);
      return;
    }
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            placeholder='Enter Student Name'
            value={name}
            type='text'
            onChange={(event) => setName(event.target.value)}
            data-testid={'student-name-input'}
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
