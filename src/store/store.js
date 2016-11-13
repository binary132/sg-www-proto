import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(VueResource)
Vue.use(Vuex)

import testData from '../assets/testData'

export default new Vuex.Store({
  state: {
    backend: '/v1',
    portNumber: '8080',
    source: 'hello',
    testData
  },

  mutations: {
    get (state, data) {
      state[data.collection] = data.value
    }
  },

  actions: {
    get (context, collection) {
      console.log('Sending GET request: ' + context.state.backend + '/' + collection)
      Vue.http.get(context.state.backend + '/' + collection).then((response) => {
        context.commit('get', {collection: collection, value: JSON.parse(response.body)})
      }, (err) => {
        context.commit('get', collection, 'Failed GET to /' + collection + ': ' + JSON.stringify(err))
      })
    }
  }
})
