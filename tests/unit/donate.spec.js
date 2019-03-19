import { shallowMount, mount } from "@vue/test-utils";
import Donate from '@/components/Donate.vue';
import storeConfig from '@/store';
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import {
  SET_SELECTED_STOP
} from '@/actions/types';
import {
  SET_STOPS,
  UPDATE_BUS_STOP_DONATION
} from '@/mutations/types';
import mutations from '@/mutations';

import Constants from '@/constants';

Vue.use(Vuex);
Vue.use(Vuetify);

const dummyData = [
  {stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd'},
  { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' }
];

const currentStop  = dummyData[1];

describe("Donate.vue", () => {
  let store;
  beforeEach(() => {
    store = Object.assign({}, storeConfig);
  });
  it("should match snapshot", () => {
    store.commit(SET_STOPS, dummyData);
    store.dispatch(SET_SELECTED_STOP, currentStop);
    const wrapper = shallowMount(Donate, {
      store,
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("validate selected bus stop", () => {
    const wrapper = shallowMount(Donate, {
      store,
      Vue
    });
    expect(wrapper.vm.selectedBusStop).toEqual(store.getters.selectedBusStop);
  });

  it("should contain donate button list options", () => {
    const wrapper = mount(Donate, {
      store,
      Vue
    });

    expect(wrapper.findAll('button[type="button"]').exists()).toBe(true);
    expect(wrapper.findAll('button[type="button"]').length).toEqual(Constants.DONATE_OPTIONS.length);
  });

  it("should validate data amount is not set", () => {
    const wrapper = mount(Donate, {
      store,
      Vue
    });

    const form = {amount: 0};

    wrapper.setData({
      form
    });

    expect(wrapper.find('.headline').text()).toContain(form.amount);
  });

  it("should trigger any selected donation button and validate data form amount", () => {
    
    
    const wrapper = mount(Donate, {
      store,
      Vue
    });

    const form = {amount: 0};

    wrapper.setData({
      form
    });
    const donateBtn = Constants.DONATE_OPTIONS[Math.round(Math.random()*(Constants.DONATE_OPTIONS.length - 1))];
    const donateBtnIndex = Constants.DONATE_OPTIONS.indexOf(donateBtn);
    const wrapperBtn = wrapper.findAll('button[type="button"]').at(donateBtnIndex);
    const donateInput = wrapper.find('input[type="number"]');
    // user added input number value but selecting button option.
    // so validating input value reset and button amount is selected and form amount match
    
    donateInput.setValue('20');
    expect(donateInput.element.value).toBe('20');
    wrapperBtn.trigger('click');
    expect(wrapper.vm.form.amount).toEqual(donateBtn);
    expect(donateInput.element.value).toBe('');
  });

  it("should validate form submit button disable prop", () => {
    const wrapper = mount(Donate, {
      store,
      Vue
    });
    const form = {amount: 0};
    wrapper.setData({
      form
    });

    const donateInput = wrapper.find('input[type="number"]');
    const nextBtn = wrapper.find('button[type="submit"]');

    // form submit button disabled reason no amount selected
    expect(nextBtn.is('[disabled]')).toBe(true);
    donateInput.setValue('30');
    expect(donateInput.element.value).toBe('30');
    // amount is set, form buttom should not be disabled
    expect(nextBtn.is('[disabled]')).toBe(false);
  });

  it("should trigger form submit click once amount is set", () => {
    const wrapper = mount(Donate, {
      store,
      Vue
    });
    const form = {amount: 0};
    wrapper.setData({
      form
    });

    const donationAmount = 50;

    const donateInput = wrapper.find('input[type="number"]');
    const donateForm = wrapper.find('form');

    donateInput.setValue(donationAmount.toString());
    expect(donateInput.element.value).toBe(donationAmount.toString());

    donateForm.trigger('submit');
    store.commit(UPDATE_BUS_STOP_DONATION, donationAmount);

    // validate user donation amount has changed
    expect(store.getters.userDonation.amount).toBe(donationAmount);
    expect(store.getters.totalFunds).toBe(donationAmount);
    
  });
});