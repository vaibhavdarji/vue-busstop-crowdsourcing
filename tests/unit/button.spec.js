import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("Button.vue", () => {
  it("should match snapshot", () => {
    const wrapper = shallowMount(Button, {
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});