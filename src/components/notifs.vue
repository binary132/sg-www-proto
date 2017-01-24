<!-- META INFO -->
<!--
  An invisible component for managing a notifications websocket and its
  actions.
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div :class="connected ? 'connected' : 'disconnected'">
  </div>
</template>

<!-- SCRIPT -->
<script>
export default {
  computed: {
    connected: function () {
      return this.$store.state.notifs.connected
    }
  },

  methods: {
    connect: function () {
      let ws = new window.WebSocket(
        'ws://' + window.location.host + this.$store.state.backend + '/notifs',
        'Bearer+' + this.$store.getters.tokenURL
      )

      ws.onopen = () => {
        console.log('notifs websocket connected')
        this.$store.dispatch('setNotifWS', ws)
      }

      ws.onclose = () => {
        console.log('notifs websocket closed')
        this.$store.dispatch('deleteNotifWS', ws)
      }

      ws.onerror = function (err) {
        console.log('failed to connect to notifs: ' + JSON.stringify(err))
      }

      ws.onmessage = (msg) => {
        this.$store.dispatch('dispatchNotif', JSON.parse(msg.data))
      }

      this.$store.dispatch('setNotifWS', ws)
    }
  },

  mounted: function () {
    this.connect()
  }
}

</script>

<!-- STYLE -->
<style scoped>
div {
    width: 10px;
    height: 10px;
    left: 10px;
    top: 10px;

    z-index: 500;

    position: absolute;
}

.connected {
    background-color: #88f088;
}

.disconnected {
    background-color: red;
}

</style>
