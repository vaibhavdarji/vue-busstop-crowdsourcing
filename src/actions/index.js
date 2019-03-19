
import * as MUTATION_TYPE from '@/mutations/types';
import * as ACTION_TYPE from '@/actions/types';
import Constants from '@/constants';
import BusStopService from '@/services/BusStopService';
const API = new BusStopService();

export default {
  [ACTION_TYPE.GET_ALL_STOPS]: (context) => new Promise((resolve, reject) => {
    context.commit(MUTATION_TYPE.SET_IS_LOADING, true);
    try {
      const response = API.getAllStops();
      context.commit(MUTATION_TYPE.SET_STOPS, response);
      setTimeout(() => context.commit(MUTATION_TYPE.SET_IS_LOADING, false), 2000);
      resolve(response);
    } catch (error) {
      const data = [];
      context.commit(MUTATION_TYPE.SET_STOPS, []);
      setTimeout(() => context.commit(MUTATION_TYPE.SET_IS_LOADING, false), 2000);
      reject(error);
    }
  }),

  [ACTION_TYPE.SET_SELECTED_STOP] (context, stop) {
    context.commit(MUTATION_TYPE.SET_SELECTED_STOP, stop);
  },

  [ACTION_TYPE.UPDATE_USER_DONATION_DETAIL] (context, payload) {
    context.commit(MUTATION_TYPE.UPDATE_USER_DONATION_INFO, payload);
  },

  [ACTION_TYPE.CHARGE_USER_FOR_DONATION]: () => new Promise((resolve, reject) =>{
    setTimeout(() => resolve(), 4000);
  }),

  [ACTION_TYPE.UPDATE_BUS_STOP_DONATION]: ({state, commit})  => new Promise((resolve, reject) => {
    try {
      API.addDonation(state.selectedBusStop.stopId, state.userDonation.amoun);
      
      setTimeout(() => {
        commit(MUTATION_TYPE.UPDATE_BUS_STOP_DONATION);
        resolve();
      }, 3000);
    } catch (error) {
      setTimeout(() => reject(error), 2000);
      
    }
    
  }),

  [ACTION_TYPE.RESET_TRANSACTION] (context) {
    context.commit(MUTATION_TYPE.CLEAR_SELECTED_BUS_STOP);
    context.commit(MUTATION_TYPE.UPDATE_USER_DONATION_INFO, Constants.USER_INFO);
  }
}