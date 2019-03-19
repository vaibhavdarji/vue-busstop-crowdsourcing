<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <template v-for="(stepItem, index) in steps">
        <v-stepper-step
          :step="index + 1" :key="index" :complete="currentStep > index + 1">
          {{stepItem.title}}
        </v-stepper-step>
        <v-divider :key="`divider-${index}`"></v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <template v-for="(stepItem, index) in steps">
        <v-stepper-content :step="index + 1" :key="index">
          <component :is="stepItem.component" @onPreviousStep="onPrevious" @onNextStep="onNext"></component>
        </v-stepper-content>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Donate from '@/components/Donate.vue';
import UserInfo from '@/components/UserInfo.vue';
import Payment from '@/components/Payment.vue';
import CompleteTransaction from '@/components/CompleteTransaction.vue';
export default {
  name: 'Stepper',
  data () {
    return {
      currentStep: 1,
      steps: [{
        title: "Donate",
        component: Donate,
        ref: "donate"
      }, {
        title: "Your Information",
        component: UserInfo,
        ref: 'personalInfo'
      },
      {
        title: "Payment Information",
        component: Payment,
        ref: 'paymentInfo'
      }, {
        title: "Payment Successful",
        component: CompleteTransaction,
        ref: 'completeInfo'
      }]
    };
  },

  components: {
    Donate,
    UserInfo,
    Payment
  },

  methods: {
    onNext () {
      if (this.currentStep === this.steps.length) {
        this.$router.push('/');
      } else {
        this.currentStep = this.currentStep + 1;
      }
    },

    onPrevious () {
      
      this.currentStep = this.currentStep - 1;
    }
  }
}
</script>

