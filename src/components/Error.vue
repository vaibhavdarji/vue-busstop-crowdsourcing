<template>
  <v-layout>
    <v-flex xs8>
      <v-list-tile-title :class="Constants.THEME.ERROR_TEXT_CLASS">
        {{msg}}
        </v-list-tile-title>
    </v-flex>
    <v-flex xs4>
      <custom-button @onClick="onRefresh()">
          Refresh
      </custom-button>
    </v-flex>
  </v-layout>
</template>

<script>
import Constants from '@/constants';
import CustomButton from '@/components/Button.vue';
export default {
  name: 'CustomError',
  props: {
    msg: {
      type: String,
      default: 'Not able to perform the operation at moment! Please try again later.'
    }
  },

  components: {
    CustomButton
  },

  computed: {
    Constants () {
      return Constants;
    }
  },

  methods: {
    onRefresh () {
      this.$emit('onErrorBtnClick');
    }
  }
}
</script>

