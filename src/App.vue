<template>
  <v-app id="app">
    <app-bar></app-bar>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";

export default {
  name: "App",
  components: {
    AppBar
  }
};
</script>

<style>
</style>
