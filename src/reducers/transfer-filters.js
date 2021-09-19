const transferFilters = (state = [0, 1, 2, 3], action) => {
  switch (action.type) {
    case 'SET_TRANSFER_FILTER':
      return action.filters;
    default:
      return state;
  }
};

export default transferFilters;
