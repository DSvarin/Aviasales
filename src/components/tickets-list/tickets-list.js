import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Alert, Spin } from 'antd';
import 'antd/dist/antd.css';
import classes from './tickets-list.module.scss';

import CostFilter from '../cost-filter';
import Ticket from '../ticket';

const TicketsList = ({ tickets, loading }) => {
  const [visibleTicketsNumber, setNumber] = useState(5);

  useEffect(() => {
    setNumber(5);
  }, [tickets]);

  return (
    <div className={classes.container}>
      <CostFilter />
      {loading ? <Spin size="large" /> : null}
      {tickets.length === 0 && !loading ? (
        <Alert message="Нет подходящих рейсов. Необходимо выбрать количество пересадок" type="info" showIcon />
      ) : null}
      <ul className={classes.list}>
        {tickets.slice(0, visibleTicketsNumber).map((ticket) => (
          <Ticket key={nanoid(10)} {...ticket} />
        ))}
      </ul>
      {tickets.length !== 0 && !loading ? (
        <button
          className={classes.showMore}
          type="button"
          aria-label="Show more"
          onClick={() => setNumber((oldN) => oldN + 5)}
        >
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      ) : null}
    </div>
  );
};

TicketsList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TicketsList;
