import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(VueResource)
Vue.use(Vuex)

export const post = (context, {resource, body, login}) => {
  // Pre-REST actions
  console.log('Sending POST request: ' + context.state.backend + '/' + resource)

  // If header included, POST with header
  if (login) {
    console.log('POST with header')
    let header = {'Authorization': 'Bearer ' + context.state.tokens.content.token}
    return Vue.http.post(context.state.backend + '/' + resource, body, header)
  } else {
    return Vue.http.post(context.state.backend + '/' + resource, body)
  }
}

export const get = (context, { resource, login }) => {
  // Pre-REST actions
  console.log('Sending GET request: ' + context.state.backend + '/' + resource)

  // REST
  if (login) {
    let header = {'Authorization': 'Bearer ' + context.state.tokens.content.token}
    return Vue.http.get(context.state.backend + '/' + resource, header)
  } else {
    return Vue.http.get(context.state.backend + '/' + resource)
  }
}
