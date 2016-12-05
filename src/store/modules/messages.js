import Vue from 'vue'
import * as helpers from '../helpers'

const resource = 'messages'

const state = {
  content: {},
  error: {}
}

const actions = {
  getAllMessages (context) {
    context.dispatch('get', {
      resource,
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        context.commit('setAllMessages', JSON.parse(response.body))
        context.commit('setMessageError', {text: 'Everything is okay!'})
      }, (err) => {
        context.commit('setMessageError', {text: 'Failed to get all messages: ' + JSON.stringify(err)})
      }
    )
  },

  getMessages (context, convoID) {
    context.dispatch('get', {
      resource: 'convos' + '/' + convoID + '/' + resource,
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        // Log messages GET response
        console.log(JSON.parse(response.body))

        context.commit('setMessages', {convoID, messages: JSON.parse(response.body)})
        context.commit('setMessageError', {text: 'Everything is okay!'})
      }, (err) => {
        context.commit('setMessageError', {text: 'Failed to get messages: ' + JSON.stringify(err)})
      }
    )
  },

  sendMessage (context, {convoID, content}) {
    let formattedMessage = JSON.stringify({content: content})

    // Send message on websocket
    context.rootState.convos.websockets[convoID].send(formattedMessage)

    // Create a fully formatted message to add to the store
    let message = {
      content,
      sender: context.rootState.profile.content.name,
      timestamp: helpers.getRFCTime()
    }
    context.commit('pushMessage', {message, convoID})
  },

  receiveMessage (context, {convoID, message}) {
    context.commit('pushMessage', {message, convoID})
  },

  initAllMessageArrays (context, convos) {
    context.commit('createAllMessageArrays', convos)
  },

  initMessageArray (context, id) {
    context.commit('createMessageArray', id)
  },

  deleteMessageArray (context, id) {
    context.commit('deleteMessageArray', id)
  }
}

const mutations = {
  setAllMessages (state, messages) {
    state.content = messages
  },

  setMessages (state, {convoID, messages}) {
    state.content[convoID] = messages
  },

  pushMessage (state, {message, convoID}) {
    state.content[convoID].push(message)
  },

  setMessageError (state, error) {
    state.error = error
  },

  createAllMessageArrays (state, convos) {
    convos.forEach(({id}) => {
      Vue.set(state.content, id, [])
    })
  },

  createMessageArray (state, id) {
    Vue.set(state.content, id, [])
  },

  deleteMessageArray (state, id) {
    delete state.content[id]
  }
}

export default {
  state,
  actions,
  mutations
}
