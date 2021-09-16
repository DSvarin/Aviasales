import { combineReducers } from 'redux';
import tickets from './tickets';
import costFilter from './cost-filter';
import transferFilters from './transfer-filters';

export default combineReducers({
  tickets,
  costFilter,
  transferFilters,
});
