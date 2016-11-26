const resource = 'messages'

const state = {
  content: {},
  error: {}
}

const actions = {
  appendMessage (context, payload) {
    context.dispatch('post', {
      resource: resource,
      body: payload
    })
  }
}

export default {
  state,
  actions
}
