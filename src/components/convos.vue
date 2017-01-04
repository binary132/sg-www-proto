<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div class="component">
    <h1>Convos</h1>
    <div v-if="loggedIn">

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
          <li v-for="(item, id) in convos"
            v-bind:class="id === currentID ? 'active' : ''">
            <span v-on:click="setActiveConvo(id)" class="item">
              {{item.name}}
            </span>
            <div v-if="item.owner === username"
                 v-on:click="deleteConvo(id)"
                 class="delete">
              ×
            </div>
          </li>
        </ul>
      </div>

      <div v-if="currentID !== ''">
        <h2>{{ convos[currentID].name }}</h2>
        <p v-if="messages.length === 0">No Messages in this Conversation. Send one to begin.</p>
        <div class="messages" v-if="currentID !== ''">
          <div v-for="item in messages">
            {{ item.sender }} » {{ item.content }}
          </div>

          <input type="text"
            v-model="msgEntry"
            @keydown.enter="sendMessage()"
            placeholder="Message Content"
            :disabled="!websocketReady">
        </div>
      </div>

    </div>
    <div v-else>
      <p>Please log in to see your conversations</p>
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
      msgEntry: '',
      convoNameEntry: '',
      convoMemberEntry: ''
    }
  },

  computed: {
    convos: function () {
      return this.$store.state.convos.content
    },

    username: function () {
      return this.$store.getters.username
    },

    messages: function () {
      return this.$store.state.messages.content[this.currentID]
    },

    websocketReady: function () {
      if (this.currentID !== '') {
        return this.$store.state.convos.websockets[this.currentID] !== undefined
      } else {
        return false
      }
    },

    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    currentID: function () {
      return this.$store.state.convos.currentID
    }
  },

  methods: {
    sendMessage: function () {
      this.$store.dispatch('sendMessage', {convoID: this.currentID, content: this.msgEntry})
      this.msgEntry = ''
    },

    receiveMessage: function (event) {
      this.$store.dispatch('receiveMessage', {convoID: this.currentID, message: JSON.parse(event.data)})
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

    deleteConvo: function (id) {
      this.$store.dispatch('deleteConvo', id).then(
      (response) => {
        if (id === this.currentID) {
          this.$store.dispatch('unsetActiveConvo')
        }
      }, (err) => {
        console.log('failed to delete convo: ' + JSON.stringify(err))
      })
    },

    setActiveConvo: function (newID) {
      // If re-selected current convo, just return
      if (newID === this.currentID) return

      // If a convo was previously active, then clean up its websocket.
      if (this.currentID !== '') {
        this.$store.dispatch('closeWebsocket', this.currentID)
      }

      // Get convo messages from server
      this.$store.dispatch('getMessages', newID)

      // Create Websocket
      let websocket = new window.WebSocket(
        'ws://' + window.location.host + this.$store.state.backend +
        '/convos/' + newID + '/start',
        'Bearer+' + this.$store.getters.tokenURL
      )

      websocket.onopen = function () {
        console.log('Websocket connection established.')
      }

      websocket.onmessage = this.receiveMessage
      console.log('Opening websocket connection...')

      this.$store.dispatch('openWebsocket', {websocket, newID})

      // Set active convo to current index
      this.$store.dispatch('setCurrentID', newID)
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
.messages div{
  color: #fff;
  font-size: 0.8em;
  line-height: 1.2em;
  margin: 0;
}
.messages div:nth-of-type(even){
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
  margin: 0.5em 0;
  padding: 0.25em;
}
button{
  width: 100%;
}
</style>
