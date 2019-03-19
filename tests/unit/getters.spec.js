import getters from "@/getters";

const dummyData = [
  { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
  { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' },
  { stopId: 3, lat: 33.757355, lng: -84.386423, donationsRaisedInDollars: 200, name: 'Georgia Pacific' },
	{ stopId: 4, lat: 33.758648, lng: -84.382754, donationsRaisedInDollars: 300, name: 'Sheraton Atlanta' }
];

const totalFunds = dummyData.map(busStop => busStop.donationsRaisedInDollars)
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

test("set busStops and validate busStops and selectBusStops", () => {
  const state = {
    isLoading: false,
    busStops: dummyData,
    selectedBusStop: null
  };

  expect(getters.isLoading(state)).toBe(false);
  expect(getters.busStops(state).length).toBe(dummyData.length);
  expect(getters.selectedBusStop(state)).toBe(null);
});

test("set selected bus stop and validate", () => {
  const state = {
    selectedBusStop: dummyData[1]
  };
  expect(getters.selectedBusStop(state)).toEqual(dummyData[1]);
});


test("set selected bus stop and validate", () => {
  const state = {
    busStops: dummyData
  };
  expect(getters.busStops(state).length).toBe(dummyData.length);
  expect(getters.totalFunds(state)).toBe(totalFunds);
});