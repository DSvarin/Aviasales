import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCostFilter, CostFilters } from '../actions';
import classes from './cost-filter.module.scss';

const CostFilter = ({ setCheapest, setFastest }) => {
  const [isActive, setActive] = useState({ cheapest: true, fastest: false });
  const activeCheapest = isActive.cheapest ? classes.filtered : null;
  const activeFastest = isActive.fastest ? classes.filtered : null;

  const onClickCheapest = () => {
    setActive({ cheapest: true, fastest: false });
    setCheapest();
  };

  const onClickFastest = () => {
    setActive({ cheapest: false, fastest: true });
    setFastest();
  };

  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <li className={`${classes.item} ${activeCheapest}`} onClick={onClickCheapest} role="presentation">
          САМЫЙ ДЕШЕВЫЙ
        </li>
        <li className={`${classes.item} ${activeFastest}`} onClick={onClickFastest} role="presentation">
          САМЫЙ БЫСТРЫЙ
        </li>
        <li className={classes.item}>ОПТИМАЛЬНЫЙ</li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCheapest: () => dispatch(setCostFilter(CostFilters.SHOW_THE_CHEAPEST)),
  setFastest: () => dispatch(setCostFilter(CostFilters.SHOW_THE_FASTEST)),
});

export default connect(null, mapDispatchToProps)(CostFilter);

CostFilter.propTypes = {
  setCheapest: PropTypes.func.isRequired,
  setFastest: PropTypes.func.isRequired,
};
