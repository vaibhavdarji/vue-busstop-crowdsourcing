import { shallowMount, mount } from "@vue/test-utils";
import Error from "@/components/Error.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("Error.vue", () => {
  it("should match snapshot", () => {
    const wrapper = shallowMount(Error, {
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should set msg prop and validate in dom content", () => {
    
    const wrapper = mount(Error, {
      Vue
    });
    const msg = 'Unable to connect to database';

    wrapper.setProps({
      msg
    });
    expect(wrapper.find(`.error--text`).text()).toContain(msg);
  });
});