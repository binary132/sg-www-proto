// Import and activate store framework
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// Import global store helpers
import * as actions from './globalActions'
import * as mutations from './globalMutations'
import * as getters from './globalGetters'

// Import store modules (collections)
import source from './modules/source'
import tokens from './modules/tokens'

// Import test data
// import testData from '../assets/testData'

// Define store
export default new Vuex.Store({
  state: {
    backend: '/v1',
    portNumber: '8080'
    // testData
  },

  getters,

  modules: {
    source,
    tokens,
    convos,
    messages
  },

  mutations,

  actions
})
