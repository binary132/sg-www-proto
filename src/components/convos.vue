<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div class="component">
    <h1>Convos</h1>
    <div class="outline">

      <h2>Convo Creator</h2>
      <div class="input-group">
        <input name='convoname' placeholder='Conversation Name' v-model='convoNameEntry'>
        <input name='convomembers' placeholder='Conversation Members' v-model='convoMemberEntry'>
      </div>
      <button v-on:click='createConvo()'>Create Conversation</button>

      <h2>Convo List</h2>
      <div class="list">
        <p v-if="Object.keys(convos).length === 0">No Conversations. Create one to begin.</p>
        <ul v-if="Object.keys(convos).length > 0">
          <li v-for="(item, index) in convos"
            v-bind:class="index === activeConvo ? 'active' : ''">
            <span v-on:click="setActiveConvo(index)" class="item">
              {{item.name}}
              <!-- <span v-if='index === activeConvo' class="active-label"> (Active)</span> -->
            </span>
            <div v-on:click="deleteConvo(index)" class="delete">
              ×
            </div>
          </li>
        </ul>
      </div>

      <h2>Message List ({{ websocketReady }})</h2>
      <p v-if="Object.keys(messages).length === 0">No Messages in this Conversation. Send one to begin.</p>
      <div class="messages" v-if="activeConvo >= 0">
        <button v-show='websocketReady' v-on:click='sendMessage()'>Send Message</button>
        <p v-for="item in messages[convos[activeConvo].id]">{{ item }}</p>

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
      msgEntry: 'MESSAGE',
      convoNameEntry: '',
      convoMemberEntry: '',
      activeConvo: -1
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
      if (this.activeConvo >= 0) {
        return this.$store.state.convos.websockets[this.convos[this.activeConvo].id] !== null
      } else {
        return false
      }
    }
  },

  methods: {
    sendMessage: function () {
      this.$store.dispatch('newMessage', {convoIndex: this.activeConvo, message: this.msgEntry})
      // this.msgEntry = ''
    },

    receiveMessage: function (event) {
      this.$store.dispatch('newMessage', {convoIndex: this.activeConvo, message: event.data})
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

    deleteConvo: function (index) {
      this.$store.dispatch('deleteConvo', index)

      if (index === this.activeConvo) {
        this.unsetActiveConvo()
      }
    },

    setActiveConvo: function (index) {
      // If re-selected current convo, just return
      if (index === this.activeConvo) return

      let convoId = this.convos[index].id

      // If a convo was already active, then clean up its websocket.
      if (this.activeConvo !== -1) {
        this.$store.dispatch('closeWebsocket', this.convos[this.activeConvo].id)
      }

      // Websocket
      let websocket = new window.WebSocket(
        'ws://' + window.location.host + this.$store.state.backend +
        '/convos/' + convoId + '/start',
        'Bearer+' + this.$store.getters.tokenURL
      )

      websocket.onopen = function () {
        console.log('Websocket connection established.')
      }

      websocket.onmessage = this.receiveMessage
      console.log('Opening websocket connection...')

      this.$store.dispatch('openWebsocket', {websocket, convoId})

      this.activeConvo = index
    },

    unsetActiveConvo: function () {
      this.$store.dispatch('closeWebsocket', this.convos[this.activeConvo].id)
      this.activeConvo = -1
    }
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
  margin-bottom: 0.5em;
}
h1, h2{
  border-bottom: 1px solid #e0d8d0;
}
p{
  color: #a098a0;
}

.list{
  text-align: left;
}
.list ul{
  padding: 0;
}
.list li{
  padding: 0 1em;
  position: relative;
  display: block;
  line-height: 1em;
}
.list li.active{
  color: #fff;
  background: rgba(255,255,255,0.15);
}
.list .item{
  cursor: pointer;
}
.list .item:hover{
  color: #fff;
}
.list .delete{
  font-size: 1.2em;
  opacity: 0.3;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 1em;
  text-align: right;
}
.list .delete:hover{
  opacity: 1.0;
}

.messages div{
  width: 100%;
}
.messages p{
  color: #fff;
  font-size: 0.8em;
  line-height: 1.2em;
  margin: 0;
}
.messages p:nth-of-type(even){
  background: rgba(255,255,255,0.15);
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
