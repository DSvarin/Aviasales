import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTransferFilters } from '../../actions';
import classes from './trnasfer-filter.module.scss';
import InputCheckbox from '../transfer-filter-checkbox';

const TrnasferFilter = ({ setTransferArr }) => {
  const [filters, setFilters] = useState([
    { value: 'Все', isChecked: true, id: 4 },
    { value: 'Без пересадок', isChecked: true, id: 0 },
    { value: '1 пересадка', isChecked: true, id: 1 },
    { value: '2 пересадки', isChecked: true, id: 2 },
    { value: '3 пересадки', isChecked: true, id: 3 },
  ]);

  const onFilterChange = ({
    target: {
      checked: isChecked,
      dataset: { value },
    },
  }) => {
    const newFilters = filters.map((filter) =>
      [filter.value, 'Все'].includes(value) ? { ...filter, isChecked } : filter
    );
    const isAll = newFilters.filter((filter) => filter.value !== 'Все').every((filter) => filter.isChecked);

    newFilters.find((filter) => filter.value === 'Все').isChecked = isAll;
    setFilters(newFilters);
    const filtersArr = newFilters.filter((item) => item.isChecked).map((item) => item.id);
    setTransferArr(filtersArr);
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      {filters.map((item) => (
        <InputCheckbox key={item.id} {...item} onFilterChange={onFilterChange} />
      ))}
    </div>
  );
};

TrnasferFilter.propTypes = {
  setTransferArr: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setTransferArr: (filtersArr) => dispatch(setTransferFilters(filtersArr)),
});

export default connect(null, mapDispatchToProps)(TrnasferFilter);
