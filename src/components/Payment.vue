<template>
  <v-card>
    <v-form ref="form" @submit.prevent="onNext">
      <v-container grid-list-xl fluid>
        <template v-if="errorMsg">
          <custom-error :msg="errorMsg" @onErrorBtnClick="onNext"></custom-error>
        </template>
        <v-layout row>
          <v-flex xs12>
           <h2>
            Your selected amount:  
            <v-icon left>attach_money</v-icon>
            {{userDonation.amount}}
           </h2>
          </v-flex>  
        </v-layout>
        <v-layout row>
          <v-flex xs8>
            <v-text-field 
              label="Card No"
              :rules="rules.cardNumber"
              v-model="form.cardNo"
              hint="1231 - 2312 - 3123 - 1231"
              mask="credit-card"   
              required
            ></v-text-field>
          </v-flex>  
        </v-layout>
         <v-layout row>
           <v-flex xs8>
            <v-text-field 
              label="Name of AC holder"
              hint="Joseph"
              :rules="rules.cardName"
              v-model="form.cardUserName"
              required
            ></v-text-field>
          </v-flex>  
         </v-layout>
        <v-layout row>
          <v-flex xs8>
            <v-text-field 
              :rules="rules.expiryDate"
              mask="##/####"
              hint="MM/YYYY"
              label="Expiry Date"
              v-model="form.cardExp"
              required>
            </v-text-field>
          </v-flex>  
          <v-flex xs4>
            <v-text-field 
              label="CVV"
              hint="1234"
              mask="####"
               :rules="rules.cvc"
              v-model="form.cardCVC"
              required>
            </v-text-field>
          </v-flex> 
          
        </v-layout>
        <v-layout row >
          <v-flex xs12>
            <h4 class="error--text" v-if="transactionError">{{transactionError}}</h4>
          </v-flex> 
        </v-layout>
        <v-card-actions>
          <custom-button @onClick="onPrevious" :disabled="loading">
          Previous 
        </custom-button>
        <v-spacer></v-spacer>
        <custom-button :isLoading="loading" type="submit" :disabled="isBtnDisable">
          Make Payment 
        </custom-button>
      </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomButton from '@/components/Button.vue';
import CustomError from '@/components/Error.vue';
import {
  UPDATE_USER_DONATION_DETAIL,
  CHARGE_USER_FOR_DONATION,
  UPDATE_BUS_STOP_DONATION
} from '@/actions/types';

export default {
  name: 'Payment',
  data () {
    const defaultForm = Object.freeze({
      cardNo: '',
      cardExp: '',
      cardCVC: '',
      cardUserName: ''
    });
    return {
      errorMsg: '',
      doRefresh: false,
      form: Object.assign({}, defaultForm),
      loading: false,
      loader: null,
      transactionError: null,
      rules: {
        cardNumber: [
          value => {
            return (value || '').trim().length === 16 || 'Enter valid credit card number';
          }
        ],
        cardName: [
          value => {
            return (value || '').trim().length > 0 || 'Enter card holder name';
          }
        ],
        cvc: [
          value => {
            return (value || '').trim().length > 2  || 'Enter valid CVC number';
          }
        ],
        expiryDate: [
          value => {
            return (value || '').trim().length === 6 || 'Enter valid expiry date';
          }
        ]
      },
      defaultForm
    };
  },

  components: {
    CustomButton,
    CustomError
  },

  computed: {
    ...mapGetters([
      'userDonation'
    ]),

    formIsValid () {
      return (this.form.cardNo && this.form.cardUserName && this.form.cardExp && this.form.cardCVC);
    },

    isBtnDisable () {
      return !this.formIsValid || this.loading;
    }
  },

  methods: {
    ...mapActions({
      'updateUserDonationDetail': UPDATE_USER_DONATION_DETAIL,
      'chargeUserForDonation': CHARGE_USER_FOR_DONATION,
      'updateBusStopDonation': UPDATE_BUS_STOP_DONATION
    }),
    onPrevious () {
      this.$emit('onPreviousStep');
    },

    onNext () {
      this.errorMsg = '';
      this.loader = 'loading';
      const l = this.loader;
      this[l] = !this[l];
      this.updateUserDonationDetail(this.form);
      this.chargeUserForDonation().then(() => {
        return this.updateBusStopDonation();
      }).then(() => {
        this[l] = false;
        this.loader = null;
        this.$emit('onNextStep');
      }).catch((error) => {
        this.errorMsg = error.message;
        this[l] = false;
        this.loader = null;
      });
    }
  }
}
</script>

