<!-- META INFO -->
<!--
    Test for backend connection and functionality
-->
<!--  -->

<!-- TEMPLATE -->
<template>
  <div class="login">
    <h3>User Access</h3>
    <div class="outline">
      <div class="input-group">
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
      sentLogin: false,
      loginResponse: 'Waiting for server event...',
      loginResponseOK: true
    }
  },

  computed: {
    pwhash: function () {
      return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.pwdEntry))
    },

    loginState: function () {
      let tokens = this.$store.state.tokens
      // let response = { msg: '', okay: true }

      // if (!this.sentLogin) {
      //   return { msg: '', okay: true }
      // } else if (!err ){
      //   return { msg: 'Waiting for server event...', okay: true }
      // }

      if (tokens && tokens.error) { return {msg: 'Failed to log-in', okay: false} }
    }
  },

  methods: {
    submitLogin: function () {
      this.$store.dispatch('post', {
        collection: 'tokens',
        body: { name: this.usnEntry, pwhash: this.pwhash }
      })

      this.sentLogin = true
      this.clearFields()
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
.login{
  max-width: 300px;
  text-align: center;
  padding: 1em;
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
