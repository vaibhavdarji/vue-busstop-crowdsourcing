import Vue from "vue";
import Vuex from "vuex";
import storeConfig from '@/store';
import {
  SET_IS_LOADING,
  SET_STOPS,
  SET_SELECTED_STOP
} from '@/mutations/types';

Vue.use(Vuex);

const stops = [
  { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
  { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' },
  { stopId: 3, lat: 33.757355, lng: -84.386423, donationsRaisedInDollars: 0, name: 'Georgia Pacific' },
  { stopId: 4, lat: 33.758648, lng: -84.382754, donationsRaisedInDollars: 0, name: 'Sheraton Atlanta' },
  { stopId: 5, lat: 33.755365, lng: -84.384921, donationsRaisedInDollars: 0, name: 'Loudermilk Center' },
  { stopId: 6, lat: 33.756887, lng: -84.389417, donationsRaisedInDollars: 0, name: 'Rialto Arts Center' },
  { stopId: 7, lat: 33.759215, lng: -84.391719, donationsRaisedInDollars: 0, name: 'Sky View Atlanta' },
  { stopId: 8, lat: 33.762046, lng: -84.391708, donationsRaisedInDollars: 0, name: 'Centennial Park' },
  { stopId: 9, lat: 33.763004, lng: -84.387041, donationsRaisedInDollars: 0, name: 'Suntrust Plaza' },
  { stopId: 10, lat: 33.754661, lng: -84.380101, donationsRaisedInDollars: 0, name: 'Sweet Auburn Market' }
];

test("check isLoading and call action setLoading to change isLoading", () => {
  const store = storeConfig;
  expect(store.state.isLoading).toBe(false);
  store.commit(SET_IS_LOADING, true);
  expect(store.state.isLoading).toBe(true);
});

test("check busStops and call action setBusStops to change busStops", () => {
  const store = storeConfig;
  expect(store.state.busStops.length).toBe(0);
  store.commit(SET_STOPS, stops);
  expect(store.state.busStops.length).toBe(stops.length);
  expect(store.state.busStops).toEqual(stops);
});


test("check selected stop and call action setSelectedBusStop to change busStop", () => {
  const store = storeConfig;
  expect(store.state.selectedBusStop).toBe(null);
  store.commit(SET_SELECTED_STOP, stops[0]);
  expect(store.state.selectedBusStop).not.toBe(stops[1]);
  expect(store.state.selectedBusStop).toEqual(stops[0]);
});