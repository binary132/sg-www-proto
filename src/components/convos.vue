<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div class="component convos">
    <h1>Convos</h1>
    <div class="outline">

      <h2>Convo Creator</h2>
      <div class="input-group">
        <input name='convoname' placeholder='Conversation Name' v-model='convoNameEntry'>
        <input name='convomembers' placeholder='Conversation Members' v-model='convoMemberEntry'>
      </div>
      <button v-on:click='createConvo()'>Create Conversation</button>

      <h2>Convo List</h2>
      <div class="convo-list">
        <p v-if="Object.keys(convos).length === 0">No Conversations. Create one to begin.</p>
        <ul v-if="Object.keys(convos).length > 0">
          <li v-for="(item, index) in convos">
            <span v-on:click="setActiveConvo(index)" v-bind:class="['convo-item', index === activeConvo ? 'active' : '']">
              {{item.name}}
              <span v-if='index === activeConvo'> (Active)</span>
            </span>
          </li>
        </ul>
      </div>

      <h2>Message List ({{ websocketReady }})</h2>
      <div class="list">
        <button v-show='websocketReady' v-on:click='sendMessage()'>Send Message</button>
        <p v-if="Object.keys(messages).length === 0">No Messages in this Conversation. Send one to begin.</p>
        <p v-if="Object.keys(messages).length > 0" v-for="item in messages">{{ msg }}</p>
      </div>

    </div>
  </div>
</template>

<!-- SCRIPT -->
<script>
export default {
  props: {
  },

  data () {
    return {
      msgEntry: 'I AM A MESSSSSSAAGE',
      convoNameEntry: '',
      convoMemberEntry: '',
      activeConvo: -1,
      websocket: null
    }
  },

  computed: {
    convos: function () {
      return this.$store.state.convos.content
    },

    messages: function () {
      return this.$store.state.messages.content
    },

    websocketReady: function () {
      if (this.websocket === null) {
        return false
      }
      return true
    }
  },

  methods: {
    sendMessage: function () {
      this.websocket.send(this.msgEntry)
      this.msgEntry = ''
    },

    receiveMessage: function (event) {
      this.convoMessages.push(event.data)
    },

    createConvo: function () {
      // Trims and parses user string into an array of users
      let rawUsersArray = this.convoMemberEntry.split(',')
      let finalUsers = {}
      rawUsersArray.forEach((user) => {
        finalUsers[user.trim()] = true
      })
      this.$store.dispatch('createConvo', {name: this.convoNameEntry, readers: finalUsers, writers: finalUsers})

      this.convoNameEntry = ''
      this.convoMemberEntry = ''
    },

    setActiveConvo: function (index) {
      // If re-selected current convo, just return
      if (index === this.activeConvo) return
      this.activeConvo = index

      // Websocket
      this.websocket = new window.WebSocket(
        'ws://' + window.location.host + this.$store.state.backend +
          '/convos/' + this.convos[index].id + '/start',
          'Bearer+' + this.$store.getters.tokenURL
      )
      this.websocket.onopen = function () {
        console.log('Websocket connection established.')
      }
      this.websocket.onmessage = this.socketReceive
      console.log('Opening websocket connection...')
    }

  },

  events: {
    // 'login-success': function () {
    // }
  }
}

</script>

<!-- STYLE -->
<style scoped>
.component{
  text-align: center;
  padding: 1.5em;
}
h1,h2,h3,h4{
  font-weight: 200;
}
h1, h2{
  border-bottom: 1px solid #e0d8d0;
}
p{
  color: #a098a0;
}
.convo-messages{
  display: flex;
}
.convo-messages div{
  width: 100%;
}
.convo-messages p{
  font-size: 0.8em;
  line-height: 1.5em;
  margin: 0;
}
.convo-messages p:nth-of-type(even){
  background: #f0f0f0;
}
.convo-item{

}
.convo-item.active{
  color: #60a060;
}
.server-source-check{
  font-size: 0.7em;
}
.api-response{
  margin-top: 0.33em;
  text-align: center;
  font-weight: 100;
  font-size: 0.8em;
}
.api-response.good{ color: #60a060; }
.api-response.bad{ color: #a06060; }

.input-group{
  display: flex;
}
input{
  text-align: center;
  width: 100%;
}
button{
  width: 100%;
}
</style>
