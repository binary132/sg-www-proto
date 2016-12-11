import * as helpers from '../helpers'
import Vue from 'vue'

const resource = 'convos'

const state = {
  content: {},
  websockets: {},
  error: {}
}

const actions = {
  onLogin (context) {
    context.dispatch('getAllConvos')
  },

  convoNotif (context, convo) {
    context.dispatch('setConvo', convo)
  },

  convoDeletedNotif (context, id) {
    context.dispatch('removeConvo', id)
  },

  convoConnectedNotif (context, {userID, convoID}) {
    console.log('user ' + userID + ' joined convo ' + convoID)
  },

  convoDisconnectedNotif (context, {userID, convoID}) {
    console.log('user ' + userID + ' left convo ' + convoID)
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

  setConvo (context, convo) {
    // If it already exists, update it
    // Otherwise, push the new one
    context.commit('pushConvo', convo)
    context.dispatch('initMessageArray', convo.id)
  },

  removeConvo (context, id) {
  },

  deleteConvo (context, id) {
    context.dispatch('DELETE', {
      resource,
      id,
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        context.commit('deleteWebsocket', id)
        context.commit('deleteConvo', id)
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

  closeWebsocket (context, convoID) {
    context.commit('deleteWebsocket', convoID)
  }
}

const mutations = {
  pushConvo (state, convo) {
    state.content.push(convo)
  },

  deleteConvo (state, id) {
    delete state.content[id]
  },

  setAllConvos (state, convos) {
    convos.forEach((convo) => {
      Vue.set(state.content, convo.id, convo)
    })
  },

  setConvoError (state, error) {
    state.error = error
  },

  setWebsocket (state, {websocket, convoID}) {
    state.websockets[convoID] = websocket
  },

  deleteWebsocket (state, convoID) {
    let ws = state.websockets[convoID]
    if (ws !== null && ws !== undefined) {
      ws.close()
      delete state.websockets[convoID]
      console.log('Deleted WS ' + convoID)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
