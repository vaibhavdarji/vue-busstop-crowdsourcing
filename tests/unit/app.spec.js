import { shallowMount} from "@vue/test-utils";
import App from "@/App.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from 'vue-router';
Vue.use(Vuetify);
Vue.use(VueRouter);

describe("App.vue", () => {
  it("should match snapshot", () => {
    const wrapper = shallowMount(App, {
      Vue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
