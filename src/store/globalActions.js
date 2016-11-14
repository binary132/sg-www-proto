import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(VueResource)
Vue.use(Vuex)

export const post = (context, args) => {
  console.log('Sending POST request: ' + context.state.backend + '/' + args.collection)
  Vue.http.post(context.state.backend + '/' + args.collection, args.body).then((response) => {
    context.commit('set', {collection: args.collection, value: JSON.parse(response.body)})
    context.commit('setErr', { collection: args.collection, error: null })
  }, (err) => {
    console.log('POST to /' + args.collection + ' failed: ' + JSON.stringify(err))
    context.commit('setErr', { collection: args.collection, error: err })
  })
}

export const get = (context, collection) => {
  console.log('Sending GET request: ' + context.state.backend + '/' + collection)
  Vue.http.get(context.state.backend + '/' + collection).then((response) => {
    context.commit('set', {collection: collection, value: JSON.parse(response.body)})
  }, (err) => {
    console.log('GET on /' + collection + ' failed: ' + JSON.stringify(err))
    context.commit('setErr', {collection: collection, error: err})
  })
}
