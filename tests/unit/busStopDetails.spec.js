import { shallowMount } from "@vue/test-utils";
import BusStopDetails from '@/components/BusStopDetails.vue';
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuex);
Vue.use(Vuetify);

const dummyData = {stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd'};

describe("BusStopDetails.vue | with selected bus stop", () => {
  let getters, store;
  beforeEach(() => {
    getters = {
      selectedBusStop: () => dummyData
    };
    store = new Vuex.Store({
      getters
    });
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(BusStopDetails, {
      store,
      Vue
    });

    wrapper.setData({
      errorMsg: '',
      doRefresh: false
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should validate selected bus stop", () => {
    const wrapper = shallowMount(BusStopDetails, {
      store,
      Vue
    });

    wrapper.setData({
      errorMsg: '',
      doRefresh: false
    });
    expect(wrapper.vm.currentBusStop).toEqual(getters.selectedBusStop());
  });
});
