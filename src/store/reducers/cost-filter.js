import { CostFilters } from '../actions';

const costFilter = (state = CostFilters.SHOW_THE_CHEAPEST, action) => {
  switch (action.type) {
    case 'SET_COST_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default costFilter;
