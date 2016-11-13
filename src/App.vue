<template>
  <div id="app">

    <main-view></main-view>

    <!-- <command-bar></command-bar> -->

    <meta-palette></meta-palette>

  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import mainView from './components/mainView'
import commandBar from './components/commandBar'
import metaPalette from './components/metaPalette'

import store from './store/store'

import testData from './assets/testData'

export default {
  name: 'app',

  components: {
    mainView,
    commandBar,
    metaPalette
  },

  data: {
    testData
  },

  store
}
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
  font-family: 'Ubuntu Mono', monospace;
}
#app{
  margin: auto;
  height: 100%;
}
</style>
