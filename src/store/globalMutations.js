export const content = (state, {resource, content}) => {
  // console.log(JSON.stringify(state))
  // console.log(JSON.stringify(resource))
  state[resource]['content'] = content
}

export const error = (state, {resource, error}) => {
  state[resource]['error'] = error
}
