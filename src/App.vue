<template>
  <div id="app">

    <view></view>

    <command-bar></command-bar>

  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import view from './components/view'
import commandBar from './components/commandBar'

export default {
  name: 'app',
  components: {
    view,
    commandBar
  }
}
</script>

<style>
#app{
  margin: auto;
}
</style>
