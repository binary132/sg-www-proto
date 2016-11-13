<!-- META INFO -->
<!--
    Main view component for app
-->
<!--  -->

<!-- TEMPLATE -->
<template><div id="main-view">

  <server-source></server-source>

</div></template>



<!-- SCRIPT -->
<script>
import backendTest from './backendTest'
import serverSource from './serverSource'

export default {
  components: {
    backendTest,
    serverSource
  },

  data () {
    return {
      name: 'Kev'
    }
  },

  computed: {
  },

  methods: {
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
