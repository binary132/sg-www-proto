<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div class="backend-test component-meta">
    <h3>Server Source Check</h3>
    <div class="server-source-check">
      {{serverSource}}
    </div>

    <hr>

    <h3>Admin Access</h3>
    <div class="outline">
      <p>Incept Ticket » {{ticket}}</p>
      <div class="input-group">
        <input name='aak' placeholder='admin api key' v-model='aakEntry'>
        <button v-on:click='getTicket()' :disabled='!aakEntry'>Get Ticket</button>
      </div>
      <h4 v-bind:class="['api-response', aakResponseOK ? 'good' : 'bad']">{{aakResponse}}</h4>

      <div class="input-group">
        <input name='cusn' placeholder='username' v-model='cUsnEntry'>
        <input name='cpwd' type='password' placeholder='password' v-model='cPwdEntry'>
      </div>
      <button v-on:click='createUser()' :disabled='!ticket'>Create User</button>
      <h4 v-bind:class="['api-response', createResponseOK ? 'good' : 'bad']">{{createResponse}}</h4>
    </div>

    <hr>

    <h3>User Access</h3>
    <div class="outline">
      <div class="input-group">
        <input name='usn' placeholder='username' v-model='usnEntry'>
        <input name='pwd' type='password' placeholder='password' v-model='pwdEntry'>
      </div>
      <button v-on:click='submitLogin()'>Log-in</button>
      <h4 v-bind:class="['api-response', loginResponseOK ? 'good' : 'bad']">{{loginResponse}}</h4>
      <h3 v-if='sessionToken'>User: {{username}}, Coin: {{coin}}</h3>
    </div>

    <hr>

    <h3>Websocket Tests</h3>
    <div class="outline">

      <h4>Stream Lister</h4>
      <div class="stream-list">
        <div class="input-group">
          <ul>
            <li v-for="(stream, index) in userStreams">
              <span v-on:click='setActiveStream(index)' v-bind:class="['stream-item', index === activeStream ? 'active' : '']">
                {{stream.name}}
                <span v-if='index === activeStream'> (Active)</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <h4>Stream Creator</h4>
      <div class="input-group">
        <input name='streamname' placeholder='Stream Name' v-model='streamNameEntry'>
        <input name='streammembers' placeholder='Stream Members' v-model='streamMemberEntry'>
      </div>
      <button v-on:click='createStream()'>Create Stream</button>
      <h4 v-bind:class="['api-response', streamResponseOK ? 'good' : 'bad']">{{streamResponse}}</h4>
      <h3 v-if='sessionToken'>User: {{username}}, Coin: {{coin}}</h3>

      <div class="stream-messages">
        <div>
          <h4>Stream Reader A ({{ websocketA.readyState }})</h4>
          <button v-on:click='socketASend()' v-bind:disabled="websocketA.readyState !== 'OPEN'">Send Message</button>
          <p v-for="msg in streamMessagesA">{{ msg }}</p>
        </div>

        <div>
          <h4>Stream Reader B ({{ websocketA.readyState }})</h4>
          <button v-on:click='socketBSend()' v-bind:disabled="websocketA.readyState !== 'OPEN'">Send Message</button>
          <p v-for="msg in streamMessagesB">{{ msg }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<!-- SCRIPT -->
<script>
import sjcl from 'sjcl'

export default {
  props: {
    backend: String,
    portNumber: Number
  },

  data () {
    return {
      username: '',
      coin: 0,
      aakEntry: '',
      cUsnEntry: '',
      usnEntry: '',
      cPwdEntry: '',
      pwdEntry: '',

      streamNameEntry: '',
      streamMemberEntry: '',
      userStreams: [],
      streamMessagesA: [],
      streamMessagesB: [],
      websocketA: {readyState: 'N/A'},
      websocketB: {readyState: 'N/A'},

      sessionToken: '',
      ticket: '',
      activeStream: 0,
      aakResponse: 'Waiting for server event...',
      aakResponseOK: true,
      createResponse: 'Waiting for server event...',
      createResponseOK: true,
      loginResponse: 'Waiting for server event...',
      loginResponseOK: true,
      streamResponse: 'Waiting for server event...',
      streamResponseOK: true,
      serverSource: 'Requesting server source...'
    }
  },

  computed: {
    cpwhash: function () {
      return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.cPwdEntry))
    },

    pwhash: function () {
      return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.pwdEntry))
    }
  },

  template: '#backend-test-template',

  mounted: function () {
    this.getServerSource()
  },

  methods: {
    getTicket: function () {
      this.$http.post(this.backend + '/admin/tickets', '', {headers: {'Authorization': 'Admin ' + this.aakEntry}}).then((response) => {
        this.ticket = JSON.parse(response.body)
        this.aakResponseOK = true
        this.aakResponse = 'Returned with valid ticket'
      }, (err) => {
        this.aakResponseOK = false
        this.aakResponse = 'Failed to get ticket (POST to /tickets): ' + JSON.stringify(err)
      })

      this.aakEntry = ''
      this.aakResponseOK = false
    },

    createUser: function () {
      this.$http.post(this.backend + '/incept' + '/' + this.ticket, {'name': this.cUsnEntry, 'pwhash': this.cpwhash}).then((response) => {
        console.log(JSON.parse(response.body))
        this.createResponseOK = true
        this.createResponse = 'Successfully created user ' + this.cusnEntry
      }, (err) => {
        console.log('Failed to create user (POST to /incept): ' + JSON.stringify(err))
        this.createResponseOK = false
        this.createResponse = 'Failed to create user'
      })

      this.cusnEntry = ''
      this.cpwdEntry = ''
    },

    socketASend: function () {
      this.websocketA.send('Hello from Member A.')
    },
    socketBSend: function () {
      this.websocketB.send('Hey from Member B!')
    },

    socketAReceive: function (event) {
      this.streamMessagesA.push(event.data)
    },
    socketBReceive: function (event) {
      this.streamMessagesB.push(event.data)
    },

    createStream: function () {
      this.$http.post(
        this.backend + '/streams', {
          'name': this.streamNameEntry,
          'readers': {[this.streamMemberEntry]: true},
          'writers': {[this.streamMemberEntry]: true}
        }, {headers: {'Authorization': 'Bearer ' + this.sessionToken}}).then((response) => {
          let stream = JSON.parse(response.body)
          console.log(stream)
          this.streamResponseOK = true
          this.streamResponse = 'Successfully created stream ' + stream.name
          this.userStreams.push(stream)
        }, (err) => {
          console.log('Failed to create stream (POST to /streams): ' + JSON.stringify(err))
          this.streamResponseOK = false
          this.streamResponse = 'Failed to create stream.'
        })

      this.streamNameEntry = ''
      this.streamMemberEntry = ''
    },

    submitLogin: function () {
      this.$http.post(this.backend + '/tokens', {'name': this.usnEntry, 'pwhash': this.pwhash}).then((response) => {
        console.log(JSON.parse(response.body))
        this.sessionToken = (JSON.parse(response.body)).token
        console.log(this.sessionToken)
        this.loginResponseOK = true
        this.loginResponse = 'Successfully logged-in'
        this.getProfile()
        this.getStreams()
        this.clearFields()
      }, (err) => {
        console.log('Failed to log-in (POST to /token): ' + JSON.stringify(err))
        this.loginResponseOK = false
        this.loginResponse = 'Failed to log-in'
      })
    },

    getStreams: function () {
      this.$http.get(this.backend + '/streams', {headers: {'Authorization': 'Bearer ' + this.sessionToken}}).then((response) => {
        console.log(JSON.parse(response.body))
        this.userStreams = JSON.parse(response.body)
      }, (err) => {
        console.log('Failed to get streams (GET to /streams): ' + JSON.stringify(err))
      })
    },

    setActiveStream: function (index) {
      // If re-selected current stream, just return
      if (index === this.activeStream) return
      this.activeStream = index

      // Close old websockets
      // if (this.websocketA !== null) {
      //   this.websocketA.close()
      // }
      // if (this.websocketB !== null) {
      //   this.websocketB.close()
      // }

      // Create new websockets
      var ws = new window.WebSocket(
        'ws://' + window.location.host + this.backend +
          '/streams/' + this.userStreams[index].id + '/start',
        // ['Bearer ' + this.sessionToken]
        [encodeURI(this.sessionToken)]
      )
      ws.onopen = function () {
        console.log('Websocket A Connection Established.')
      }
      ws.onmessage = this.socketAReceive
      console.log('created websocket A')
      this.websocketA = ws

      this.websocketB = new window.WebSocket(
        'ws://' + window.location.host + this.backend +
          '/streams/' + this.userStreams[index].id + '/start',
        // ['Bearer ' + this.sessionToken]
        ['blah']
      )
      this.websocketB.onopen = function () {
        console.log('Websocket B Connection Established.')
      }
      this.websocketB.onmessage = this.socketBReceive
    },

    getProfile: function () {
      this.$http.get(this.backend + '/profile', {headers: {'Authorization': 'Bearer ' + this.sessionToken}}).then((response) => {
        console.log(JSON.parse(response.body))
        this.username = (JSON.parse(response.body)).name
        this.coin = (JSON.parse(response.body)).coin
      }, (err) => {
        console.log('Failed to get profile (GET to /profile): ' + JSON.stringify(err))
      })
    },

    getServerSource: function () {
      this.$http.get(this.backend + '/source').then((response) => {
        console.log('Received /source response from server.')
        this.serverSource = JSON.parse(response.body)
      }, (err) => {
        this.serverSource = 'Failed to get source (GET to /source): ' + JSON.stringify(err)
        console.log(this.serverSource)
      })
    },

    clearFields: function () {
      this.usnEntry = ''
      this.pwdEntry = ''
    }

  },

  events: {
    'login-success': function () {
    }
  }
}

</script>

<!-- STYLE -->
<style scoped>
.stream-messages{
  display: flex;
}
.stream-messages div{
  width: 100%;
}
.stream-messages p{
  font-size: 0.8em;
  line-height: 1.5em;
  margin: 0;
}
.stream-messages p:nth-of-type(even){
  background: #f0f0f0;
}
.stream-item{

}
.stream-item.active{
  color: #60a060;
}
.server-source-check{
  font-size: 0.7em;
}
.api-response{
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
