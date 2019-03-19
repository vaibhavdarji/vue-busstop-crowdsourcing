<template>
  <v-btn 
    :type="btnType"
    :loading="isLoading"
    v-bind="{ [`${Constants.BUTTON.SIZE}`]: true }"
    :color="Constants.BUTTON.BG_COLOR"
    :class="[`${Constants.BUTTON.COLOR}--text`]"
    :disabled="disabled"
    @click="onClickBtn"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
import Constants from '@/constants';
export default {
  name:'CustomButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: 'button' 
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {};
  },
  computed: {
    Constants () {
      return Constants;
    }
  },
  methods: {
    onClickBtn () {
      this.$emit('onClick');
    } 
  }
}
</script>

