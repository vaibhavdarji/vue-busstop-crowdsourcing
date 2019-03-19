import { shallowMount, mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import BusStops from '@/components/BusStops.vue';
import Constants from '@/constants';
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuex);
Vue.use(Vuetify);

describe("Home.vue", () => {
  let  getters, store;

  beforeEach(() => {
    getters = {
      isLoading: () => false,
      busStops: () => []
    };
    store = new Vuex.Store({
      getters
    });
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(Home, {
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should contain BusStops.vue as a child component", () => {
    const wrapper = mount(Home, {
      store,
      Vue
    });
    expect(wrapper.contains(BusStops)).toBe(true);
  });

  it("BusStop.vue child component id match", () => {
    const wrapper = mount(Home, {
      store,
      Vue
    });

    const {
      BS_LIST_ID
    } = Constants.APP_TITLE;
    expect(wrapper.find(BusStops).attributes('id')).toBe(BS_LIST_ID);
  });
});