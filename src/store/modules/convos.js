import * as helpers from '../helpers'

const resource = 'convos'

const state = {
  content: [],
  error: {}
}

const actions = {
  onLogin (context) {
    context.dispatch('getAllConvos')
  },

  getAllConvos (context) {
    context.dispatch('get', {
      resource,
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        context.commit('setAllConvos', JSON.parse(response.body))
      }, (err) => {
        context.commit('setConvoError', {text: 'Failed to get convos: ' + JSON.stringify(err)})
      }
    )
  },

  createConvo (context, {name, readers, writers}) {
    context.dispatch('post', {
      resource,
      body: {
        name,
        readers,
        writers
      },
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        console.log('insert conversation: ' + JSON.parse(response.body))
        context.commit('pushConvo', JSON.parse(response.body))
        context.commit('setConvoError', {text: 'Everything is okay!'})
      }, (err) => {
        console.log('error inserting conversation: ' + JSON.stringify(err))
        console.log(helpers.HEADER_USER)
        context.commit('setConvoError', {text: 'Something went wrong', error: err})
      })
  }
}

// context.commit('content', {resource: resource, content: JSON.parse(response.body)})
// context.commit('error', { resource: resource, error: {text: 'Everything is okay!'} })

const mutations = {
  pushConvo (state, convo) {
    state.content.push(convo)
  },

  setAllConvos (state, convos) {
    state.content = convos
  },

  setConvoError (state, error) {
    state.error = error
  }
}

export default {
  state,
  actions,
  mutations
}
