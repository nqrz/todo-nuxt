export const state = () => ({
  list: [],
  error: ''
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text,
      done: false,
      id: Date.now()
    })
    state.error = ''
  },
  error (state) {
    state.error = 'Please type something.'
  },
  remove (state, todo) {
    state.list = state.list.filter(item => item.id !== todo.id)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}