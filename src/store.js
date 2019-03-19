import Vue from "vue";
import Vuex from "vuex";

import Constants from '@/constants';

import mutations from '@/mutations';
import actions from '@/actions';
import getters from '@/getters';

Vue.use(Vuex);

const state = {
  busStops: [],
  selectedBusStop: null,
  isLoading: false,
  totalFunds: 0,
  userDonation: {
    ...Constants.USER_INFO
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
