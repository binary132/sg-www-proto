import * as helpers from '../helpers'

const resource = 'profile'

const state = {
  content: {},
  error: {}
}

const actions = {
  onLogin (context) {
    context.dispatch('getProfile')
  },

  getProfile (context) {
    context.dispatch('get', {
      resource,
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        let profile = JSON.parse(response.body)
        context.commit('setProfile', profile)
        context.commit('setProfileError', {text: 'Everything is okay!'})
      }, (err) => {
        context.commit('setProfileError', {text: 'Failed to get profile: ' + JSON.stringify(err)})
      }
    )
  }

  // deleteProfile (context) {
  // }
}

const mutations = {

  setProfile (state, profile) {
    // TODO: If something not updating, switch to Vue.set
    state.content = profile
  },

  setProfileError (state, error) {
    state.error = error
  },

  deleteProfile (state, convoId) {
    state.content = {}
  }
}

export default {
  state,
  actions,
  mutations
}
