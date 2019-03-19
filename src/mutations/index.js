import * as MUTATION_TYPE from '@/mutations/types';

export default {
  [MUTATION_TYPE.SET_STOPS] (state, payload) {
    state.busStops = payload;
  },

  [MUTATION_TYPE.SET_IS_LOADING] (state, payload) {
    state.isLoading = payload;
  },

  [MUTATION_TYPE.SET_SELECTED_STOP] (state, stop) {
    state.selectedBusStop = stop;
  },

  [MUTATION_TYPE.SET_TOTAL_FUNDS] (state, payload) {
    state.totalFunds += payload;
  },

  [MUTATION_TYPE.UPDATE_USER_DONATION_INFO] (state, payload) {
    Object.assign(state.userDonation, payload);
  },

  [MUTATION_TYPE.UPDATE_BUS_STOP_DONATION] (state) {
    Object.assign(state.selectedBusStop, {
      donationsRaisedInDollars: state.selectedBusStop.donationsRaisedInDollars + state.userDonation.amount
    });
    Object.assign(state.busStops, state.busStops.map(el=> el.stopId === state.selectedBusStop.stopId? state.selectedBusStop : el))
  },

  [MUTATION_TYPE.CLEAR_SELECTED_BUS_STOP] (state) {
    state.selectedBusStop = null;
  }
};