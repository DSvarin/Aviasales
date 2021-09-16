import React from 'react';
import PropTypes from 'prop-types';
import classes from './transfer-filter-checkbox.module.scss';

const InputCheckbox = ({ value, isChecked, onFilterChange }) => (
  <label className={classes.item}>
    <input
      className={classes.checkinput}
      checked={isChecked}
      type="checkbox"
      data-value={value}
      onChange={onFilterChange}
    />
    <span className={classes.checkbox} />
    {value}
  </label>
);

export default InputCheckbox;

InputCheckbox.propTypes = {
  value: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
