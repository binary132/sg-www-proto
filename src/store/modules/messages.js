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
        context.commit('setMessageError', {text: 'Failed to get messages: ' + JSON.stringify(err)})
      }
    )
  },

  newMessage (context, {convoIndex, message}) {
    let id = context.rootState.convos.content[convoIndex].id
    context.rootState.convos.websockets[id].send(message)
    context.commit('pushMessage', {message, id})
  },

  initAllMessageArrays (context, convos) {
    context.commit('createAllMessageArrays', convos)
  },

  initMessageArray (context, id) {
    context.commit('createMessageArray', id)
  }
}

const mutations = {
  pushMessage (state, {message, id}) {
    state.content[id].push(message)
  },

  setAllMessages (state, messages) {
    state.content = messages
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
  }
}

export default {
  state,
  actions,
  mutations
}
