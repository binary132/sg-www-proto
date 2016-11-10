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

</div></template>



<!-- SCRIPT -->
<script>
import backendTest from './backendTest'

export default {
  components: {
    backendTest
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
}
</style>
