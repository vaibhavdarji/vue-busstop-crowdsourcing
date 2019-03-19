<template>
  <v-card :id="Constants.APP_TITLE.BS_LIST_ID">
    <v-container grid-list-xl fluid>
      <v-layout v-if="isLoading" row wrap justify-center align-center>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>
      <template v-if="errorMsg">
        <custom-error :msg="errorMsg" @onErrorBtnClick="onRefresh"></custom-error>
      </template>

      <v-layout row wrap v-else>
        <v-flex xs4 v-for="stop in totalStops" :key="stop.stopId" :class="Constants.APP_BS_ITEMS.BS_CARD_CLS">
          <bus-stop :stop="stop"></bus-stop>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Constants from '@/constants';
import CustomButton from "@/components/Button.vue";
import BusStop from "@/components/BusStop.vue";
import CustomError from "@/components/Error.vue";
import {
  GET_ALL_STOPS
} from '@/actions/types';
export default {
  name: "BusStops",
  data() {
    return {
      errorMsg: "",
      doRefresh: false
    };
  },

  components: {
    BusStop,
    CustomButton,
    CustomError
  },

  asyncComputed: {
    totalStops: {
      get() {
        return this.busStops.length
          ? this.busStops
          : this.getAllStops()
              .then(data => {
                this.doRefresh = false;
                return data;
              })
              .catch(error => {
                this.errorMsg = error.message;
                this.doRefresh = false;
              });
      },

      default() {
        return [];
      },
      watch() {
        this.doRefresh
      }
    }
  },
  computed: {
    ...mapGetters(["isLoading", "busStops"]),
    Constants () {
      return Constants;
    }
  },

  methods: {
    ...mapActions({
      "getAllStops": GET_ALL_STOPS
    }),

    onRefresh() {
      this.errorMsg = "";
      this.doRefresh = true;
    }
  }
};
</script>

<style>
.v-progress-linear {
  border-radius: 10px;
}
</style>


