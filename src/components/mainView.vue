<!-- META INFO -->
<!--
    Main view component for app
-->
<!--  -->

<!-- TEMPLATE -->
<template><div id="main-view" :class="loggedIn">

  <div style="col"></div>

  <div style="col">
    <convos></convos>
  </div>

  <div style="col"></div>

</div></template>



<!-- SCRIPT -->
<script>
import convos from './convos'

export default {
  components: {
    convos
  },

  data () {
    return {
    }
  },

  computed: {
    loggedIn: function () {
      if (Object.keys(this.$store.state.tokens.content).length > 0) {
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
  color: #e0d8d0;
  display: flex;
}
#main-view.loggedIn{
  background: #408060;
}

.col{
  width: 33.333%;
  height: 100%;
}


</style>
