export const set = (state, data) => {
  state[data.collection] = data.value
}

// export const add = (state, data) => {
//   state[data.collection] = (data.value)
// }

export const setErr = (state, data) => {
  state[data.collection.error] = data.value
}
