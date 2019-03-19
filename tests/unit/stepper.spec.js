import { shallowMount } from "@vue/test-utils";
import Stepper from "@/components/Stepper.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("Stepper.vue", () => {
  it("should match snapshot", () => {
    const wrapper = shallowMount(Stepper, {
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});