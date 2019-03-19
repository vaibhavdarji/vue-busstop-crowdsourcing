import { shallowMount } from "@vue/test-utils";
import UserInfo from '@/components/UserInfo.vue';

import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Constants from '@/constants';

Vue.use(Vuex);
Vue.use(Vuetify);

describe("UserInfo.vue", () => {
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
    const wrapper = shallowMount(UserInfo, {
      store,
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});