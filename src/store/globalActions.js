// TODO: change function names to caps

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
      // console.log('POST with user authorization header')
      return Vue.http.post(context.state.backend + '/' + resource, body, {headers: header})

    default:
      // console.log('POST without header')
      return Vue.http.post(context.state.backend + '/' + resource, body)
  }
}

export const get = (context, {resource, login}) => {
  // Pre-REST actions
  // console.log('Sending GET request: ' + context.state.backend + '/' + resource)

  // REST
  switch (login) {

    case helpers.HEADER_USER:
      let header = {'Authorization': 'Bearer ' + context.state.tokens.content.token}
      // console.log('GET with user authorization header')
      return Vue.http.get(context.state.backend + '/' + resource, {headers: header})

    default:
      // console.log('GET without header')
      return Vue.http.get(context.state.backend + '/' + resource)
  }
}

export const PUT = (context, {resource, id, login}) => {
  switch (login) {
    case helpers.HEADER_USER:
      let header = {'Authorization': 'Bearer ' + context.state.tokens.content.token}
      return Vue.http.put(context.state.backend + '/' + resource + '/' + id, {headers: header})

    default:
      // console.log('PUT without header')
      return Vue.http.put(context.state.backend + '/' + resource + '/' + id)
  }
}

export const DELETE = (context, {resource, id, login}) => {
  switch (login) {
    case helpers.HEADER_USER:
      let header = {'Authorization': 'Bearer ' + context.state.tokens.content.token}
      return Vue.http.delete(context.state.backend + '/' + resource + '/' + id, {headers: header})

    default:
      // console.log('DELETE without header')
      return Vue.http.delete(context.state.backend + '/' + resource + '/' + id)
  }
}
