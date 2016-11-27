import * as helpers from '../helpers'

const resource = 'convos'

const state = {
  content: [],
  websockets: {},
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
        let convos = JSON.parse(response.body)
        context.commit('setAllConvos', convos)
        context.dispatch('initAllMessageArrays', convos)
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
        let convo = JSON.parse(response.body)
        console.log('insert conversation: ' + convo)
        context.commit('pushConvo', convo)
        context.commit('setConvoError', {text: 'Everything is okay!'})
        context.dispatch('initMessageArray', convo.id)
      }, (err) => {
        console.log('error inserting conversation: ' + JSON.stringify(err))
        console.log(helpers.HEADER_USER)
        context.commit('setConvoError', {text: 'Something went wrong', error: err})
      })
  },

  deleteConvo (context, index) {
    let id = context.state.content[index].id
    context.dispatch('DELETE', {
      resource,
      id,
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        context.commit('deleteWebsocket', id)
        context.commit('deleteConvo', index)
        context.dispatch('deleteMessageArray', id)
        context.commit('setConvoError', {text: 'Everything is okay!'})
      }, (err) => {
        console.log('Errored on delete')
        context.commit('setConvoError', {text: 'Something went wrong', error: err})
      }
    )
  },

  openWebsocket (context, args) {
    context.commit('setWebsocket', args)
  },

  closeWebsocket (context, convoId) {
    context.commit('deleteWebsocket', convoId)
  }
}

const mutations = {
  pushConvo (state, convo) {
    state.content.push(convo)
  },

  deleteConvo (state, index) {
    state.content.splice(index, 1)
  },

  setAllConvos (state, convos) {
    state.content = convos
  },

  setConvoError (state, error) {
    state.error = error
  },

  setWebsocket (state, {websocket, convoId}) {
    state.websockets[convoId] = websocket
  },

  deleteWebsocket (state, convoId) {
    let ws = state.websockets[convoId]
    if (ws !== null && ws !== undefined) {
      ws.close()
      delete state.websockets[convoId]
      console.log('Deleted WS ' + convoId)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
