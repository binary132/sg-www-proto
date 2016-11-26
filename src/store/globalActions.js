import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(VueResource)
Vue.use(Vuex)

import * as helpers from './helpers'

export const post = (context, {resource, body, login}) => {
  // If header included, POST with header
  switch (login) {

    case helpers.HEADER_USER:
      let header = {'Authorization': 'Bearer ' + context.state.tokens.content.token}
      console.log('POST with user authorization header')
      return Vue.http.post(context.state.backend + '/' + resource, body, {headers: header})

    default:
      console.log('POST without header')
      return Vue.http.post(context.state.backend + '/' + resource, body)
  }
}

export const get = (context, { resource, login }) => {
  // Pre-REST actions
  console.log('Sending GET request: ' + context.state.backend + '/' + resource)

  // REST
  switch (login) {

    case helpers.HEADER_USER:
      let header = {'Authorization': 'Bearer ' + context.state.tokens.content.token}
      console.log('GET with user authorization header')
      return Vue.http.get(context.state.backend + '/' + resource, {headers: header})

    default:
      console.log('GET without header')
      return Vue.http.get(context.state.backend + '/' + resource)
  }
}
