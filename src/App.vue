<template>
  <div id="app">

    <backend-test
     backend="/v1"
     :port-number="8080">
    </backend-test>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import backendTest from './components/backendTest'

export default {
  name: 'app',
  components: {
    backendTest
  }
}
</script>

<style>
#app{
  width: 500px;
  margin: auto;
}
</style>
