const resource = 'convos'

const state = {
  content: {},
  error: {}
}

const actions = {
  createConvo (context, {name, readers, writers}) {
    context.dispatch('post', {
      resource,
      body: {
        name,
        readers,
        writers
      },
      headers: {
        'Authorization': 'Bearer ' + context.state.tokens.content.token
      }
    }).then(
      (response) => {
        context.commit('content', {resource: resource, content: JSON.parse(response.body)})
        console.log('set new token ' + response)
      }, (err) => {
        console.log('error getting new token: ' + JSON.stringify(err))
        context.commit('setErr', 'tokens', err)
      })
  }
}

// context.commit('content', {resource: resource, content: JSON.parse(response.body)})
// context.commit('error', { resource: resource, error: {text: 'Everything is okay!'} })

const mutations = {
  insertConvo (state, convo) {
    state.content[convo.id] = {
      owner: convo.owner,
      name: convo.name,
      readers: convo.readers,
      writers: convo.writers
    }
  }
}

export default {
  state,
  actions,
  mutations
}
