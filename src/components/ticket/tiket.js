import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import classes from './tiket.module.scss';

const Ticket = ({ carrier, price, segments }) => {
  const imgUrl = `//pics.avs.io/99/36/${carrier}.png`;

  const getDepartArrivalTime = (departureTime, timeDistance) => {
    let hoursD = new Date(departureTime).getHours();
    let minutesD = new Date(departureTime).getMinutes();
    let hoursA = hoursD + Math.trunc(timeDistance / 60);
    let minutesA = minutesD + (timeDistance % 60);

    while (minutesA > 60) {
      minutesA -= 60;
      hoursA += 1;
    }

    while (hoursA > 24) {
      hoursA -= 24;
    }

    hoursD = hoursD >= 10 ? hoursD : `0${hoursD}`;
    minutesD = minutesD >= 10 ? minutesD : `0${minutesD}`;
    hoursA = hoursA >= 10 ? hoursA : `0${hoursA}`;
    minutesA = minutesA >= 10 ? minutesA : `0${minutesA}`;

    return `${hoursD}:${minutesD} - ${hoursA}:${minutesA}`;
  };

  const getDistanceHM = (timeDistance) => {
    const hours = Math.trunc(timeDistance / 60);
    const minutes = timeDistance % 60;
    return `${hours}ч ${minutes}м`;
  };

  const getStopsTitle = (stopsArr) => {
    const amount = stopsArr.length;

    switch (true) {
      case amount === 0:
        return 'БЕЗ ПЕРЕСАДОК';
      case amount === 1:
        return '1 ПЕРЕСАДКА';
      case amount >= 2 && amount <= 3:
        return `${amount} ПЕРЕСАДКИ`;
      default:
        return 'СЛИШКОМ МНОГО ПЕРЕСАДОК ';
    }
  };

  const getCost = (cost) => {
    const costStr = `${cost}`;
    const costL = costStr.length;
    return `${costStr.slice(0, costL - 3)} ${costStr.slice(costL - 3, costL)}`;
  };

  return (
    <li className={classes.item}>
      <div className={classes.header}>
        <div className={classes.cost}>{getCost(price)} Р</div>
        <img src={imgUrl} alt="Логотип" />
      </div>
      <div>
        {segments.map((segment) => {
          const { origin, destination, stops, date, duration } = segment;
          return (
            <div className={classes.toFromContainer} key={nanoid(2)}>
              <div className={classes.key}>
                {origin} - {destination}
              </div>
              <div className={classes.key}>В ПУТИ</div>
              <div className={classes.key}>{getStopsTitle(stops)}</div>
              <div className={classes.value}>{getDepartArrivalTime(date, duration)}</div>
              <div className={classes.value}>{getDistanceHM(duration)}</div>
              <div className={classes.value}>{stops.join(', ')}</div>
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default Ticket;

Ticket.propTypes = {
  carrier: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
