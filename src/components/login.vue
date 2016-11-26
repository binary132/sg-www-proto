<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div :class="['component', minimized ? 'minimized' : '']">
    <h3 v-on:click='toggleMinimize()'>{{title}}</h3>
    <div>
      <div class="input-group" v-if="">
        <input name='usn' placeholder='username' v-model='usnEntry'>
        <input name='pwd' type='password' placeholder='password' v-model='pwdEntry'>
      </div>
      <button v-on:click='submitLogin()'>Log-in</button>
      <h4 v-bind:class="['api-response', loginResponse.okay ? 'good' : 'bad']">{{loginResponse.msg}}</h4>
    </div>
  </div>
</template>

<!-- SCRIPT -->
<script>
import sjcl from 'sjcl'

export default {
  data () {
    return {
      usnEntry: '',
      pwdEntry: '',
      username: '',
      sentLogin: false,
      loginResponse: 'Waiting for server event...',
      loginResponseOK: true,
      minimized: true
    }
  },

  computed: {
    tokens: function () {
      return this.$store.state.tokens.content
    },
    error: function () {
      return this.$store.state.tokens.error
    },

    pwhash: function () {
      return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.pwdEntry))
    },

    title: function () {
      if (this.loggedIn) {
        return 'User: ' + this.username
      } else {
        return 'Not Logged In'
      }
    },

    loggedIn: function () {
      return this.loginResponseOK && (Object.keys(this.tokens).length > 0)
    },

    loginState: function () {
      if (!this.tokens) { return {msg: 'Failed to log-in', okay: false} }
    }
  },

  methods: {
    submitLogin: function () {
      this.$store.dispatch('logIn', {
        name: this.usnEntry,
        pwhash: this.pwhash
      })

      this.sentLogin = true
      this.username = this.usnEntry
      this.clearFields()
    },

    clearFields: function () {
      this.usnEntry = ''
      this.pwdEntry = ''
    },

    toggleMinimize: function () {
      this.minimized = !this.minimized
      if (this.minimized) {
        this.focusUsernameInput
      }
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
.component{
  position: fixed;
  max-width: 200px;
  text-align: center;
  outline: 1px solid #a97;
  bottom: 0;

  color: #a97;
  background: #302a28;

  transition: all 0.2s ease;
}
.component:hover{ bottom: 0; }
.component.minimized{
  bottom: -5.35em;
}
.component.minimized:hover{
  bottom: -5em;
}
.component h3{
  font-size: 1.2em;
  font-weight: 100;
  margin: 0 0em 1em 0;
  line-height: 1.5em;
  background: #282220;
  border-bottom: 1px solid #a97;
  cursor: pointer;
}
.component.minimized h3{
  font-size: 1em;
}
.component > div{
  margin: 1em;
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
input, button{
  text-align: center;
  width: 100%;
  background-color: #282220;
  border: none;
  outline: 1px solid #a97;
  color: #a97;
  padding: 0.5em;
  outline-offset: 0px;
}
input:focus{
  outline: 1px solid #eda;
  z-index: 10;
  color: #eda;
}
button{
  width: 100%;
  cursor: pointer;
}
button:hover, button:focus{
  color: #eda;
  outline-color: #eda;
}
</style>
