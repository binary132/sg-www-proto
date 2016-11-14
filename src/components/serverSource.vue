<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div class="server-source component">
    <h3>Server Source</h3>
    <p>{{serverSource}}</p>
  </div>
</template>

<!-- SCRIPT -->
<script>
export default {
  computed: {
    serverSource: function () {
      return this.$store.state.source
    }
  },

  mounted: function () {
    this.$store.dispatch('get', 'source')
  }
}

</script>

<!-- STYLE -->
<style scoped>
.server-source{
  color: #a97;
}
h3{
  margin: 0;
}
p{
  margin: 0;
}
</style>
