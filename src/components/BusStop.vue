<template>
  <v-hover>
    <v-card  tile :class="['rounded-card', `elevation-${hover ? 12 : 2}`]" slot-scope="{ hover }">
      <v-card-title primary-title>
        <v-icon left>edit_location</v-icon>
        <div class="headline">{{stop.name}}</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-flex xs8>
          <v-list-tile-title>
            <span class="headline">$ {{stop.donationsRaisedInDollars}}</span>
            <span class="body-1 pl-2">{{Constants.CURRENCY}} raised</span>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <v-progress-linear
              :value="percentage"
              :background-color="Constants.LINEAR_PROGRESS_BAR.BG_COLOR"
              :color="Constants.LINEAR_PROGRESS_BAR.COLOR"
            ></v-progress-linear>
          </v-list-tile-sub-title>
          <v-list-tile-title>
            <span class="subheading">{{`${percentage} %`}}</span>
            <span class="pl-2 body-1">of {{`${Constants.CURRENCY} ${Constants.MAX_DONATE}`}} raised</span>
            <v-tooltip top :color="Constants.LINEAR_PROGRESS_BAR.COLOR" max-width="210px">
              <template v-slot:activator="{ on }">
                <span class="ml-1 body-1 text-underline" v-on="on">fixed goal</span>
              </template>
              <span>
                This campaign 
                {{stop.donationsRaisedInDollars > 700 ? 'has': 'has not'}}
                reached its goal
                and will receive all funds raised.
              </span>
            </v-tooltip>
          </v-list-tile-title>
        </v-flex>
        <v-flex xs4>
          <custom-button @onClick="selectStop(stop)">Donate</custom-button>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Constants from "@/constants";
import CustomButton from "@/components/Button.vue";
import {
  SET_SELECTED_STOP
} from '@/actions/types';
export default {
  name: "BusStop",
  props: {
    stop: {
      type: Object,
      default: {}
    }
  },

  components: {
    CustomButton
  },

  computed: {
    Constants() {
      return Constants;
    },

    percentage() {
      return Math.round(
        (this.stop.donationsRaisedInDollars / Constants.MAX_DONATE) * 100
      );
    }
  },

  methods: {
    ...mapActions({
      "setSelectedStop": SET_SELECTED_STOP
    }),
    selectStop(stop) {
      this.setSelectedStop(stop);
      this.$router.push({ path: "stop" });
    }
  }
};
</script>

<style>
.text-underline {
  border-bottom: 1px dashed;
}
.rounded-card {
  border-radius: 10px;
}
</style>
