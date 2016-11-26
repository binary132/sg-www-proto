<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div class="server-source component">
    <h3>Server Source</h3>
    <span v-text="serverSource"></span>
  </div>
</template>

<!-- SCRIPT -->
<script>
export default {
  computed: {
    serverSource: function () {
      return this.$store.state.source.content
    }
  },

  mounted: function () {
    this.$store.dispatch('getSource', {resource: 'source'})
  }
}

</script>

<!-- STYLE -->
<style scoped>
.server-source{
  position: absolute;
  text-align: center;
  color: #a97;
  font-size: 12px;
  bottom: 1em;
  width: 100%;
}
h3{
  margin: 0;
}
p{
  margin: 0;
}
</style>
