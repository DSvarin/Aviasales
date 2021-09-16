import { connect } from 'react-redux';
import { CostFilters } from '../actions';
import TicketsList from '../tickets-list';

const getVisibleTicketsTransferFilter = (tickets, filters) =>
  tickets.filter(
    (ticket) =>
      filters.indexOf(ticket.segments[0].stops.length) >= 0 && filters.indexOf(ticket.segments[1].stops.length) >= 0
  );

const getVisibleTicketsCostFilter = (ticketsAfterFilter, filter) => {
  switch (filter) {
    case CostFilters.SHOW_THE_CHEAPEST:
      return ticketsAfterFilter.sort((prev, next) => prev.price - next.price);
    case CostFilters.SHOW_THE_FASTEST:
      return ticketsAfterFilter.sort((prev, next) => {
        const [{ duration: durationToPrev }, { duration: durationFromPrev }] = prev.segments;
        const [{ duration: durationToNext }, { duration: durationFromNext }] = next.segments;
        return durationToPrev + durationFromPrev - (durationToNext + durationFromNext);
      });
    default:
      return ticketsAfterFilter;
  }
};

const mapStateToProps = (state) => ({
  tickets: getVisibleTicketsCostFilter(
    getVisibleTicketsTransferFilter(state.tickets, state.transferFilters),
    state.costFilter
  ),
});

export default connect(mapStateToProps, null)(TicketsList);
