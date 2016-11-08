<!-- META INFO -->
<!--
    Meta menu
-->
<!--  -->

<!-- TEMPLATE -->
<template><div id='meta-palette'>

<div v-for='item in buttons' class='menu-item'>
  {{ item }}
</div>

</div></template>



<!-- SCRIPT -->
<script>
export default {
  data () {
    return {
      buttons: ['Home', 'About', 'Community', 'Help']
    }
  }
}
</script>



<!-- STYLE -->
<style scoped>
#meta-palette{
  color: #a97;
  position: fixed;
  width: 500px;
  height: 2em;
  bottom: 3em;
  left: calc(50% - 250px);
  display: flex;

}

.menu-item{
  text-align: center;
  width: 100%;
  justify-content: space-around;
}

</style>
