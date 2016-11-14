import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from '../globalActions'
import * as mutations from '../globalMutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  actions,

  mutations

})
