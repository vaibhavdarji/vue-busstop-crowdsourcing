import { shallowMount, mount } from "@vue/test-utils";
import BusStops from '@/components/BusStops.vue';
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuex);
Vue.use(Vuetify);

const dummyData = [
  { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
  { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' }
];

describe("BusStops.vue", () => {

  let  state, getters, actions, mutations, store;
  beforeEach(() => {
    state = {
      isLoading: false,
      busStops: []
    };

    mutations = {
      setLoading (loading) {
        state.isLoading = loading;
      },

      setStops (stops) {
        state.busStops = stops;
      }
    };

    actions = {
      getAllStops () {
        mutations.setLoading(true);
        mutations.setStops(dummyData);
        mutations.setLoading(false);
      }
    };

    getters = {
      isLoading: state => state.isLoading,
      busStops: state => state.busStops
    };

    store = new Vuex.Store({
      state,
      actions,
      getters
    });
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(BusStops, {
      store,
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should load data", () => {
    actions.getAllStops();

    expect(state.isLoading).toBe(false);
    expect(state.busStops.length).toBe(dummyData.length);
  });

  it("should match data with no of DOM card elements generated", () => {
    actions.getAllStops();
    const wrapper = shallowMount(BusStops, {
      store,
      Vue
    });

    expect(wrapper.vm.busStops.length).toBe(dummyData.length);
    
  });
});