<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text" :id="headerInfo.ELEM_ID">
        {{headerInfo.TITLE}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <h1 class="headline py-3" :id="headerInfo.TF_ELEM_ID">
          Total Donation: 
          <v-icon>attach_money</v-icon>
          {{totalFunds}}
        </h1>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Constants from '@/constants';
export default {
  name: 'AppBar',
  data () {
    return {
      appTitle: 'Bus-stop crowdsourcing web application'
    };
  },

  computed: {
    ...mapGetters([
      'totalFunds'
    ]),

    headerInfo () {
      return Constants.APP_TITLE;
    }
  }
}
</script>

