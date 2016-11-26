const resource = 'source'

const state = {
  content: {},
  error: {}
}

const actions = {
  getSource (context) {
    return context.dispatch('get', {
      resource: resource
    }).then(
      (response) => {
        // console.log('setting source to: ', JSON.parse(response.body))
        context.commit('setSourceContent', JSON.parse(response.body))
        context.commit('setSourceError', 'Everything is okay!')
      }, (err) => {
        console.log('error getting source: ' + JSON.stringify(err))
        context.commit('setSourceErr', err)
      })
  }
}

const mutations = {
  setSourceContent (state, content) {
    state.content = content
  },
  setSourceError (state, error) {
    state.error = error
  }
}

export default {
  state,
  actions,
  mutations
}
