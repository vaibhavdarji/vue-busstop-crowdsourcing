<template>
  <v-card>
    <v-container grid-list-xl fluid>
      <v-layout row>
         <v-flex xs12>
           <h2>
              Thank you for supporting our Move {{selectedBusStop.name}} with your donation of
              <v-icon>attach_money</v-icon>
              {{userDonation.amount}}.
           </h2>
         </v-flex>  
       </v-layout>
       <v-card-actions>
          <v-spacer></v-spacer>
          <custom-button @onClick="onComplete">
            Done
          </custom-button>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomButton from '@/components/Button.vue';
import {
  RESET_TRANSACTION
} from '@/actions/types';

export default {
  name: 'CompleteTransaction',
  data () {
    return {};
  },

  components: {
    CustomButton
  },

  computed: {
    ...mapGetters([
      'selectedBusStop',
      'userDonation'
    ])
  },

  methods: {
    ...mapActions({
      'resetTransaction': RESET_TRANSACTION
    }),
    onComplete () {
      this.resetTransaction();
      this.$router.push('/');
    }
  }
}
</script>

