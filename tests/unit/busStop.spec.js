import { shallowMount, mount } from "@vue/test-utils";
import BusStop from '@/components/BusStop.vue';
import Button from '@/components/Button.vue';
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import {
  SET_SELECTED_STOP
} from '@/actions/types';

Vue.use(Vuex);
Vue.use(Vuetify);

const dummyData = [
  { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
  { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' }
];

describe("BusStops.vue", () => {
  let actions, store;
  beforeEach(() => {
    actions = {
    };

    actions[SET_SELECTED_STOP] = jest.fn();
    store = new Vuex.Store({
      actions
    });
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(BusStop, {
      propsData: {
        stop: dummyData[Math.round(Math.random()*(dummyData.length - 1))]
      },
      store,
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should contain Button.vue as a child component", () => {
    document.body.setAttribute('data-app', true);
    const wrapper = mount(BusStop, {
      propsData: {
        stop: dummyData[Math.round(Math.random()*(dummyData.length - 1))]
      },
      store,
      Vue
    });
    expect(wrapper.contains(Button)).toBe(true);
  });

  it("should validate selected bus stop data in dom elements", () => {
    const currentStop = dummyData[Math.round(Math.random()*(dummyData.length - 1))];
    const wrapper = mount(BusStop, {
      propsData: {
        stop: currentStop
      },
      store,
      Vue
    });

    // stop title name validation
    expect(wrapper.find('div.headline').text()).toEqual(currentStop.name);

    // stop donation amount validation
    expect(wrapper.find('span.headline').text()).toContain(currentStop.donationsRaisedInDollars);

    // stop donation percentage validation
    expect(wrapper.find('span.subheading').text()).toContain(wrapper.vm.percentage);
  });

  it("should trigger select stop buttion click event. calls store action", () => {
    const currentStop = dummyData[Math.round(Math.random()*(dummyData.length - 1))];
    const wrapper = mount(BusStop, {
      propsData: {
        stop: currentStop
      },
      store,
      Vue
    });
    
    wrapper.setMethods({"selectStop": actions[SET_SELECTED_STOP]});
    const btnInput = wrapper.find('button');
    btnInput.trigger('click');
    expect(actions[SET_SELECTED_STOP]).toHaveBeenCalled();
  });
});