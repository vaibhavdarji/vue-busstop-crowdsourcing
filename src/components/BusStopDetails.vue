<template>
  <v-container fluid grid-list-md>
    <template v-if="errorMsg">
      <custom-error :msg="errorMsg" @onErrorBtnClick="onRefresh"></custom-error>
    </template>
    <template v-if="currentBusStop">
      <v-layout row wrap justify-center>
        <v-flex xs8>
          <stepper></stepper>
        </v-flex>
      </v-layout>
    </template>
    <template v-if="!errorMsg && !currentBusStop">
      <v-layout row wrap justify-center>
        <v-flex xs6 align-center>
          <v-select
            :items="totalStops"
            label="Select bus stop to donate"
            item-text="name"
            item-value="name"
            persistent-hint
            return-object
            single-line
            @change="onChangeBusSelect"
          ></v-select>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>



<script>
import { mapGetters, mapActions } from 'vuex';
import Stepper from '@/components/Stepper.vue';
import CustomError from '@/components/Error.vue';
import {
  GET_ALL_STOPS,
  SET_SELECTED_STOP
} from '@/actions/types';

export default {
  name: 'BusStopDetails',
  data () {
    return {
      errorMsg: '',
      doRefresh: false
    };
  },

  components: {
    Stepper,
    CustomError
  },

  asyncComputed: {
   totalStops: {
     get () {
       return this.busStops.length ? this.busStops: this.getAllStops().then((data) => {
         this.doRefresh = false;
         return data;
       }).catch((error) => {
         this.errorMsg = error.message;
       });
     },

     default() {
       return [];
     },
     watch () {
      this.doRefresh
      }
   },
  },

  computed: {
    ...mapGetters(['selectedBusStop', 'busStops']),
    currentBusStop () {
      return this.selectedBusStop;
    }
  },

  methods: {
    ...mapActions({
      'getAllStops': GET_ALL_STOPS,
      'setSelectedStop': SET_SELECTED_STOP
    }),
    onChangeBusSelect(stop) {
      this.setSelectedStop(stop);
    },
    onRefresh () {
      this.errorMsg = '';
      this.doRefresh = true;
    }
  }
}
</script>

