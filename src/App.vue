<template>
  <div id="app">

    <main-view></main-view>

    <!-- <command-bar></command-bar> -->

    <meta-palette></meta-palette>

    <login></login>

    <notifs v-if="loggedIn"></notifs>

    <server-source></server-source>

  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import mainView from './components/mainView'
import commandBar from './components/commandBar'
import metaPalette from './components/metaPalette'
import login from './components/login'
import notifs from './components/notifs'
import serverSource from './components/serverSource'

import store from './store/store'

export default {
  name: 'app',

  components: {
    mainView,
    commandBar,
    metaPalette,
    login,
    notifs,
    serverSource
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    }
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
input, button{
  font-family: 'Ubuntu Mono', monospace;
}
#app{
  margin: auto;
  height: 100%;
}
</style>
