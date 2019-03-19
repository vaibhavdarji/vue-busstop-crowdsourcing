import { shallowMount, mount } from "@vue/test-utils";
import AppBar from "@/components/AppBar.vue";
import Constants from '@/constants';

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from 'vue-router';
import Vuetify from "vuetify";


Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);

describe("AppBar.vue", () => {
  let getters, store;

  beforeEach(() => {
    getters = {
      totalFunds: () => 0
    };
    store = new Vuex.Store({
      getters
    });
  });
  it("should match snapshot", () => {
    const wrapper = shallowMount(AppBar, {
      store,
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should contain app title, render correct title element", () => {
    const wrapper = shallowMount(AppBar, {
      store,
      Vue
    });

    const {
      TITLE,
      ELEM_ID
    } = Constants.APP_TITLE;

    const appTitleElement = wrapper.find(`#${ELEM_ID}`);

    expect(appTitleElement.text()).toBe(TITLE);
  });

  it("should contain total fund, render correct total fund element", () => {
    const wrapper = shallowMount(AppBar, {
      store,
      Vue
    });

    const {
      TF_ELEM_ID
    } = Constants.APP_TITLE;
    const tfElement = wrapper.find(`#${TF_ELEM_ID}`);
    expect(tfElement.text()).toContain(getters.totalFunds().toString());
  });
});
