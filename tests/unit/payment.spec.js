import { shallowMount, mount } from "@vue/test-utils";
import Payment from '@/components/Payment.vue';

import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Constants from '@/constants';

Vue.use(Vuex);
Vue.use(Vuetify);

describe("Payment.vue", () => {
  let getters, store;
  beforeEach(() => {
    getters = {
      userDonation: () => ({
        ...Constants.USER_INFO
      })
    };
    store = new Vuex.Store({
      getters
    });
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(Payment, {
      store,
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});