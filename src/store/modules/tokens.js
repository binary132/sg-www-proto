// import Vue from 'vue'
// import Vuex from 'vuex'
//
// import * as actions from '../globalActions'
// import * as mutations from '../globalMutations'

// Vue.use(Vuex)

const resource = 'tokens'

const state = {}

const actions = {
  refreshToken (context, payload) {
    context.dispatch('post', {
      resource: resource,
      body: payload
    })
  }
}

export default {
  state,
  actions
}
