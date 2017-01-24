let cases = {
  'convos': 'convoNotif',
  'convo-deleted': 'convoDeletedNotif',
  'convo-connected': 'convoConnectedNotif',
  'convo-disconnected': 'convoDisconnectedNotif'
}

const state = {
  websocket: {},
  connected: false,
  error: {}
}

const actions = {
  setNotifWS (context, ws) {
    context.commit('setNotifWS', ws)
  },

  deleteNotifWS (context, ws) {
    context.commit('setNotifWS', ws)
  },

  dispatchNotif (context, {name, contents}) {
    context.dispatch(cases[name], contents)
  }
}

const mutations = {
  setNotifWS (state, ws) {
    state.websocket = ws
    state.connected = true
  },

  deleteNotifWS (state) {
    state.websocket = null
    state.connected = false
  }
}

export default {
  state,
  actions,
  mutations
}
