import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(VueResource)
Vue.use(Vuex)

export const post = (context, {resource, body}) => {
  console.log('Sending POST request: ' + context.state.backend + '/' + resource)
  Vue.http.post(context.state.backend + '/' + resource, body).then((response) => {
    context.commit('content', {resource: resource, content: JSON.parse(response.body)})
    context.commit('error', { resource: resource, error: {text: 'Everything is okay!'} })
  }, (err) => {
    console.log('POST to /' + resource + ' failed: ' + JSON.stringify(err))
    context.commit('error', { resource: resource, error: err })
  })
}

export const get = (context, { resource }) => {
  console.log('Sending GET request: ' + context.state.backend + '/' + resource)
  Vue.http.get(context.state.backend + '/' + resource).then((response) => {
    context.commit('content', {resource: resource, content: JSON.parse(response.body)})
    context.commit('error', { resource: resource, error: {text: 'Everything is okay!'} })
  }, (err) => {
    console.log('GET on /' + resource + ' failed: ' + JSON.stringify(err))
    context.commit('error', {resource: resource, error: err})
  })
}
