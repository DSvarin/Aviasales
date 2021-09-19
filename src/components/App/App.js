import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './App.module.scss';
import logo from './Logo.svg';

import { setData } from '../../actions';

import AviasalesService from '../../services/aviasalesapi-service';
import TrnasferFilter from '../transfer-filter';
import TicketsList from '../tickets-list';

const App = ({ setTickets }) => {
  const [loading, setLoading] = useState(true);
  const aviasalesService = new AviasalesService();

  useEffect(() => {
    aviasalesService
      .getSearchId()
      .then((searchId) => aviasalesService.getTickets(searchId))
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
        <TicketsList loading={loading} />
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
