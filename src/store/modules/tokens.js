const resource = 'tokens'

const state = {
  content: {},
  error: {}
}

const actions = {
  logIn (context, payload) {
    context.dispatch('post', {
      resource: resource,
      body: payload
    }).then((response) => {
      console.log('set new token ' + JSON.parse(response.body))
      context.commit('setTokenContent', JSON.parse(response.body))
      context.commit('setTokenError', {text: 'Everything is okay!'})
    }, (err) => {
      console.log('error getting new token: ' + JSON.stringify(err))
      context.commit('setTokenError', {text: 'OH NO!', reason: err})
    })
  }
}

// context.commit('content', {resource: resource, content: JSON.parse(response.body)})
// context.commit('error', { resource: resource, error: {text: 'Everything is okay!'} })

// console.log('GET on /' + resource + ' failed: ' + JSON.stringify(err))
// context.commit('error', {resource: resource, error: err})

const mutations = {
  setTokenContent (state, content) {
    state.content = content
  },
  setTokenError (state, error) {
    state.error = error
  }
}

export default {
  state,
  actions,
  mutations
}
