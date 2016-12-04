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

  dispatchNotif (context, notif) {
    console.log('received ' + notif.name + ' notif: ' + JSON.stringify(JSON.parse(notif.contents)))
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
