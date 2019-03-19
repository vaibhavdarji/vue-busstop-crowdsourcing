<template>
  <v-card>
    <v-form ref="form" @submit.prevent="onNext">
      <v-container grid-list-xl fluid>
        <v-layout wrap>
           <v-flex xs12>
             <v-card-title class="headline pl-0">
               Yes, I want to donate to
              {{selectedBusStop.name}} :
              <template>
                <v-icon left>attach_money</v-icon>
                {{form.amount}}
              </template>
            </v-card-title>
           </v-flex>
           <v-flex xs12 pl-0>
             <template v-for="(option,index) in Constants.DONATE_OPTIONS">
               <custom-button
                :key="index"
                @onClick="onSelectDonateOption(option)">
                 <v-icon left>attach_money</v-icon>
                {{option}}
             </custom-button>
              </template>
           </v-flex>
           <v-flex xs12 sm6>
             <v-text-field 
              label="Enter Your Amount" 
              prepend-inner-icon="attach_money" 
              class="inputPrice"
              outline
              type="number"
              ref="otherAmount"
              @input="OnInputOtherAmount"
            ></v-text-field>
           </v-flex>
           <v-flex xs12 v-if="!formIsValid">
             <span :class="Constants.THEME.ERROR_TEXT_CLASS">Please select an amount to donate</span>
           </v-flex>
           <v-flex xs12 pl-0>
             <custom-button type="submit" :disabled="!formIsValid">
               Next 
             </custom-button>
           </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomButton from '@/components/Button.vue';
import Constants from '@/constants';
import {
  UPDATE_USER_DONATION_DETAIL
} from '@/actions/types';

export default {
  name: 'Donate',
  data () {
    const defaultForm = Object.freeze({
      amount: 0
    });
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        amount: [ val => val >= 1]
      },
      defaultForm
    };
  },

  components: {
    CustomButton
  },

  computed: {
    ...mapGetters(['selectedBusStop']),
    Constants() {
      return Constants;
    },
    formIsValid () {
      return (
        this.form.amount >= 1
      )
    }
  },

  methods: {
    ...mapActions({
      'updateUserDonationDetail': UPDATE_USER_DONATION_DETAIL
    }),
    onSelectDonateOption (value) {
      this.$refs.otherAmount.reset();
      this.form.amount = value;
    },

    OnInputOtherAmount (value) {
      this.form.amount = parseFloat(parseFloat(value).toFixed(2));
    },

    onNext () {
      this.$emit('onNextStep');
      this.updateUserDonationDetail({amount: this.form.amount});
    },
  }
}
</script>

<style >
  .inputPrice 
    input[type='number'] {
      -moz-appearance: textfield;
  }

  .inputPrice
     input::-webkit-outer-spin-button,
     input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
</style>


