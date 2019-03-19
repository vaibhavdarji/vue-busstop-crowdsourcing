import { shallowMount, mount } from "@vue/test-utils";
import CompleteTransaction from '@/components/CompleteTransaction.vue';

import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Constants from '@/constants';

Vue.use(Vuex);
Vue.use(Vuetify);

const busStop =  {stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd'};

describe("CompleteTransaction.vue", () => {
  let getters, store;
  beforeEach(() => {
    getters = {
      selectedBusStop : () => busStop,
      userDonation: () => ({
        ...Constants.USER_INFO,
        ...{
          amount: 700
        }
      })
    };
    store = new Vuex.Store({
      getters
    });
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(CompleteTransaction, {
      store,
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});