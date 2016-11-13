<!-- META INFO -->
<!--
    Main view component for app
-->
<!--  -->

<!-- TEMPLATE -->
<template><div id="main-view" :class="loggedIn">

  <login></login>

  <server-source></server-source>

</div></template>



<!-- SCRIPT -->
<script>
import login from './login'
import serverSource from './serverSource'

export default {
  components: {
    login,
    serverSource
  },

  data () {
    return {
    }
  },

  computed: {
    loggedIn: function () {
      if (this.$store.state.tokens.length > 0) {
        return 'loggedIn'
      } else {
        return ''
      }
    }
  },

  methods: {
  }
}
</script>



<!-- STYLE -->
<style>
#main-view{
  width: 100%;
  height: 100vh;
  background: #383230;
}
#main-view.loggedIn{
  background: #408060;
}
.backendTest{
  width: 500px;
  height: 75vh;
  margin: auto;
  color: #e0d8d0;
}
</style>
