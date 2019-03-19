<template>
 <v-card>
   <v-form ref="form" @submit.prevent="onNext">
     <v-container grid-list-xl fluid>
       <v-layout row>
         <v-flex xs12>
           <h2>
           You selected amount:  
            <v-icon left>attach_money</v-icon>
            {{userDonation.amount}}
           </h2>
         </v-flex>  
       </v-layout>
       <v-layout row>
         <v-flex xs2 pl-0>
           <v-subheader>Full Name: </v-subheader>
         </v-flex>
         <v-flex xs8>
           <v-text-field 
              label="Full Name"
              :rules="rules.name"
              v-model="form.userName"
              required
            ></v-text-field>
         </v-flex>
       </v-layout>
       <v-layout row>
         <v-flex xs2 pl-0>
           <v-subheader>Email: <small>(optional)</small></v-subheader>
         </v-flex>
         <v-flex xs8>
           <v-text-field 
              v-model="form.userEmail"
              label="Email"
              type="email"
            ></v-text-field>
         </v-flex>
       </v-layout>
      <v-card-actions>
        <custom-button @onClick="onPrevious">
          Previous 
        </custom-button>
        <v-spacer></v-spacer>
        <custom-button type="submit" :disabled="!formIsValid">
          Next 
        </custom-button>
      </v-card-actions>
     </v-container>
   </v-form>
 </v-card> 
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
import CustomButton from '@/components/Button.vue';
import {
  UPDATE_USER_DONATION_DETAIL
} from '@/actions/types';

export default {
  name: 'UserInfo',
  data () {
    const defaultForm = Object.freeze({
      userName: '',
      userEmail: ''
    });
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        name: [
          value => {
            return (value || '').trim().length > 0 || 'Enter your full name';
          }
        ]
      },
      defaultForm
    };
  },

  components: {
    CustomButton
  },

  computed: {
    ...mapGetters([
      'userDonation'
    ]),

    formIsValid () {
      return (this.form.userName);
    },
  },

  methods: {
    ...mapActions({
      'updateUserDonationDetail': UPDATE_USER_DONATION_DETAIL
    }),
    onPrevious () {
      this.$emit('onPreviousStep');
    },

    onNext () {
      this.updateUserDonationDetail(this.form);
      this.$emit('onNextStep');
    }
  }
}
</script>

