import mutations from '@/mutations';
import * as MUTATION_TYPE from '@/mutations/types';
import Constants from '@/constants';

const dummyData = [
  { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
  { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' }
];

test('"assign" busStops data through mutations and validate against state', () => {
  const state = {
    busStops: []
  };
  mutations[MUTATION_TYPE.SET_STOPS](state, dummyData);
  expect(state.busStops.length).toBe(dummyData.length);
});

test("assign totalFunds through mutations and validate against state", () => {
  const state = {
    totalFunds: 0
  };
  expect(state.totalFunds).toBe(0);
  mutations[MUTATION_TYPE.SET_TOTAL_FUNDS](state, 10);
  expect(state.totalFunds).toBe(10);
});

test("assing user donation state and validate", () => {
  const state = {
    userDonation: {
      ...Constants.USER_INFO
    }
  };
  expect(state.userDonation).toEqual(Constants.USER_INFO);
});

test("update user donation details throuh mutations and validate against state", () => {
  const state = {
    userDonation: {
      ...Constants.USER_INFO
    }
  };
  const updateUser = {
    amount: 500
  };
  mutations[MUTATION_TYPE.UPDATE_USER_DONATION_INFO](state, updateUser);
  expect(state.userDonation.amount).toBe(updateUser.amount);
});

test("update user name and email throuh mutations and validate against state", () => {
  const state = {
    userDonation: {
      ...Constants.USER_INFO
    }
  };
  const updateUser = {
    userName: "Vaibhav Darji",
    userEmail: "vaibhavdarji.1986@gmail.com"
  };
  mutations[MUTATION_TYPE.UPDATE_USER_DONATION_INFO](state, updateUser);
  expect(state.userDonation).toEqual(expect.objectContaining(updateUser));
});

test("update user credit card details throuh mutations and validate against state", () => {
  const state = {
    userDonation: {
      ...Constants.USER_INFO
    }
  };
  const updateUser = {
    cardNo: "1234567890123456",
    cardExp: "102029",
    cardUserName: "Vaibhav Darji",
    cardCVC: "111"
  };
  mutations[MUTATION_TYPE.UPDATE_USER_DONATION_INFO](state, updateUser);
  expect(state.userDonation).toEqual(expect.objectContaining(updateUser));
});