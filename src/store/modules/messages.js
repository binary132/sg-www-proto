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

  getMessages (context, convoId) {
    context.dispatch('get', {
      resource: 'convos' + '/' + convoId + '/' + resource,
      login: helpers.HEADER_USER
    }).then(
      (response) => {
        context.commit('setMessages', {convoId, messages: JSON.parse(response.body)})
        context.commit('setMessageError', {text: 'Everything is okay!'})
      }, (err) => {
        context.commit('setMessageError', {text: 'Failed to get messages: ' + JSON.stringify(err)})
      }
    )
  },

  sendMessage (context, {convoIndex, message}) {
    let convoId = context.rootState.convos.content[convoIndex].id
    context.rootState.convos.websockets[convoId].send(message)
    context.commit('pushMessage', {message, convoId})
  },

  receiveMessage (context, {convoIndex, message}) {
    let convoId = context.rootState.convos.content[convoIndex].id
    context.commit('pushMessage', {message, convoId})
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

  setMessages (state, {convoId, messages}) {
    state.content[convoId] = messages
  },

  pushMessage (state, {message, convoId}) {
    state.content[convoId].push(message)
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
