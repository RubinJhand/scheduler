import React from 'react';

import 'components/InterviewerListItem.scss';

import classNames from 'classnames';

export default function InterviewerListItem(props) {
  const { name, avatar, selected } = props;

  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
    'interviewers__item-image': avatar,
  });
  return (
    <li className={interviewerClass}>
      <img className={interviewerClass} src={avatar} alt={name} />
      {name}
    </li>
  );
}
