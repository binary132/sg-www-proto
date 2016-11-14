<!-- META INFO -->
<!--
    Main view component for app
-->
<!--  -->

<!-- TEMPLATE -->
<template><div id="main-view" :class="loggedIn">

</div></template>



<!-- SCRIPT -->
<script>
export default {
  components: {
  },

  data () {
    return {
    }
  },

  computed: {
    loggedIn: function () {
      if (this.$store.state.tokens.token) {
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
