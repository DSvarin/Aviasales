// Action types

export const SET_COST_FILTER = 'SET_COST_FILTER';
export const SET_TRANSFER_FILTER = 'SET_TRANSFER_FILTER';
export const SET_DATA = 'SET_DATA';

// Filters values

export const CostFilters = {
  SHOW_THE_CHEAPEST: 'SHOW_THE_CHEAPEST',
  SHOW_THE_FASTEST: 'SHOW_THE_FASTEST',
};

// Action Creators

export function setCostFilter(filter) {
  return { type: SET_COST_FILTER, filter };
}

export function setTransferFilters(filters) {
  return { type: SET_TRANSFER_FILTER, filters };
}

export function setData(data) {
  return { type: SET_DATA, data };
}
