import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './App.module.scss';
import logo from './Logo.svg';

import { setData } from '../actions';

import TrnasferFilter from '../transfer-filter';
import VisibleTicketsList from '../containers/VisibleTicketsList';

const App = ({ setTickets }) => {
  const [loading, setLoading] = useState(true);

  const getSearchId = async () => {
    const response = await fetch(`https://front-test.beta.aviasales.ru/search`);
    if (!response.ok) {
      throw new Error(`Could not fetch https://front-test.beta.aviasales.ru/search, received ${response.status}`);
    }
    const jsonresp = await response.json();
    return jsonresp.searchId;
  };

  const getTickets = async (Id, oldTickets = []) => {
    const response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${Id}`);

    if (!response.ok && response.status === 500) {
      return getTickets(Id, oldTickets);
    }
    const jsonresp = await response.json();
    const ticketsArr = [...oldTickets, ...jsonresp.tickets];

    if (!jsonresp.stop) {
      return getTickets(Id, ticketsArr);
    }
    return ticketsArr;
  };

  useEffect(() => {
    getSearchId()
      .then((searchId) => getTickets(searchId))
      .then((tickets) => {
        setTickets(tickets);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.App}>
      <div className={classes.logo}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={classes.container}>
        <TrnasferFilter />
        <VisibleTicketsList loading={loading} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setTickets: (data) => dispatch(setData(data)),
});

App.propTypes = {
  setTickets: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
