<!-- META INFO -->
<!--
    Main view component for app
-->
<!--  -->

<!-- TEMPLATE -->
<template><div id="main-view">

  <backend-test
   backend="/v1"
   :port-number="8080"
   class="backendTest">
  </backend-test>

  <button @click="testStore">Increment: ({{ numClicks }})</button>

</div></template>



<!-- SCRIPT -->
<script>
import backendTest from './backendTest'

export default {
  components: {
    backendTest
  },

  data () {
    return {
      name: 'Kev'
    }
  },

  computed: {
    numClicks () {
      return this.$store.state.count
    }
  },

  methods: {
    testStore: function () {
      this.$store.dispatch('increment')
    }
  }
}
</script>



<!-- STYLE -->
<style>
#main-view{
  background: #383230;
  width: 100%;
  height: 100vh;
}
.backendTest{
  width: 500px;
  height: 75vh;
  margin: auto;
  color: #e0d8d0;
}
</style>
