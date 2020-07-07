import React from 'react';

import 'components/DayListItem.scss'

const classNames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = (spot) => {
    if (!spot) {
      return 'no spots remaining';
    }
    if (spot === 1) {
      return '1 spot remaining';
    } else {
      return `${spot} spots remaining`;
    }
  };

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}